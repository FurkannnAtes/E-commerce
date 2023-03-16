export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'subId',
      title: 'ID',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
    },
    {
      name: 'sellingBy',
      title: 'Selling By',
      type: 'sellingBy',
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'comment'}],
        },
      ],
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
    },
  ],
}
