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
          <template v-if="section.rows">
            <tr v-if="section.label">
              <th colspan="4">
                {{ section.label }}
              </th>
            </tr>
            <tr v-for="row in section.rows" :key="row.name">
              <template v-if="section.type === 'props'">
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
              </template>

              <template v-else-if="section.type === 'events'">
                <td colspan="4">
                  {{ row.name }}
                </td>
              </template>

              <template v-else-if="section.type === 'slots'">
                <td>{{ row.name }}</td>
                <td colspan="4" class="p-0">
                  <div v-if="row.description" class="p-3">{{ row.description }}</div>

                  <table v-if="row.bindings && row.bindings.length">
                    <thead>
                      <tr>
                        <th>Binding name</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="binding in row.bindings" :key="binding.name">
                        <td>{{ binding.name }}</td>
                        <td><code>{{ binding.type.name }}</code></td>
                        <td
                          class="free-text"
                          v-html="$options.filters.md(binding.description)"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </template>
            </tr>
          </template>
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
