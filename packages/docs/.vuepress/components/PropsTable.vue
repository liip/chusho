<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(section, i) in sections">
          <tr v-if="section.label">
            <th colspan="4">
              {{ section.label }}
            </th>
          </tr>
          <template v-if="section.rows && section.rows.length">
            <tr v-for="row in section.rows" :key="row.name">
              <td>
                {{ row.name }}&nbsp;<abbr
                  v-if="row.required"
                  title="Required"
                  class="required"
                  >*</abbr
                >
              </td>
              <td>
                <code>{{ row.type.name }}</code>
              </td>
              <td>
                <code v-if="row.defaultValue">{{
                  row.defaultValue.value
                }}</code>
              </td>
              <td
                class="free-text"
                v-html="$options.filters.md(row.description)"
              ></td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4">
              <em>This component doesn’t accept any props.</em>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PropsTable',

  props: {
    sections: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped>
.required {
  color: #e53e3e;
  text-decoration: none;
}
</style>