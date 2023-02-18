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
import PropsTable from './PropsTable.vue';

export default {
  components: {
    PropsTable,
  },

  props: {
    doc: {
      type: Object,
      required: true,
    },
  },
};
</script>
