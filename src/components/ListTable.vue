<template>
  <div class="items">
    <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.name" scope="col">{{column.label}}</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="(value, name) in item" :key="name" v-show="showColumn(name)" scope="row">
          <span v-if="name === 'deadline'">{{item[name].datetime}}</span>
          <span v-else>{{item[name]}}</span>
        </td>
        <td scope="row" :class="item.enabled ? 'text-success':'text-danger'">{{item.enabled ? '啟用':'停用'}}</td>
        <td scope="row">
          <button
            @click="$emit('open-modal', {item, isNew: false})"
            data-toggle="modal"
            type="button"
            class="btn btn-outline-primary btn-sm">編輯</button>
          <button @click="$emit('comfirm-delete', item.id)" data-toggle="modal" data-target="#confirm-delete" type="button" class="btn btn-outline-danger btn-sm">刪除</button>
          <button type="button"
            class="btn btn-outline-primary btn-sm" @click="$emit('duplicate', item)">複製</button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  props: ['items', 'columns'],
  methods: {
    showColumn (name) {
      return this.columns.some((column, idx) => {
        return column.name === name
      })
    }
  }
}
</script>
