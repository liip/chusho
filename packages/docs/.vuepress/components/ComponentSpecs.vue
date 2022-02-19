<template>
  <PropsTable
    :sections="[
      {
        label: 'Props',
        type: 'props',
        rows: doc.props,
      },
      {
        label: 'Events',
        type: 'events',
        rows: doc.events,
      },
      {
        label: 'Slots',
        type: 'slots',
        rows: doc.slots,
      },
    ]"
  />
</template>

<script>
export default {
  props: {
    doc: {
      type: Object,
      required: true,
    },
  },
};
</script>
