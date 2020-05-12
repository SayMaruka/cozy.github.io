import { mergeBundles } from './rules'

const ops1 = [
  { _id: 't1', date: '2020-08-01', manualCategoryId: '400140' },
  { _id: 't2', date: '2020-07-01', manualCategoryId: '400140' },
  { _id: 't3', date: '2020-06-01', manualCategoryId: '400140' },
  { _id: 't4', date: '2020-05-01', manualCategoryId: '400140' }
]

const ops2 = [
  { _id: 't5', date: '2020-12-01', manualCategoryId: '400130' },
  { _id: 't6', date: '2020-11-01', manualCategoryId: '400130' },
  { _id: 't7', date: '2020-10-01', manualCategoryId: '400130' },
  { _id: 't8', date: '2020-09-01', manualCategoryId: '400130' }
]

describe('merge hydrated bundles', () => {
  it('should not duplicate ops', () => {
    const bundles = [
      {
        ops: ops1,
        categoryIds: ['400140']
      },

      {
        ops: [...ops2, ...[ops1[0], ops2[0]]],
        categoryIds: ['400130', '400120']
      }
    ]
    const merged = mergeBundles(bundles)
    expect(merged.ops.length).toBe(ops1.length + ops2.length)
  })

  it('should merge categoryIds and put the most recent one in front', () => {
    const bundles = [
      {
        ops: ops1,
        categoryIds: ['400140']
      },

      {
        ops: ops2,
        categoryIds: ['400130', '400120']
      }
    ]
    const merged = mergeBundles(bundles)
    expect(merged.categoryIds).toEqual(['400130', '400140', '400120'])
  })
})
