<template>
  <v-row class="pa-16">
    <v-col cols="12">
      <h1>Table 1</h1>
      <v-card class="card-table-1" elevation="0">
        <div id="icon1" class="hide-icon">
          <img id="icon" width="150" :src="DropDown" />
        </div>

        <v-data-table
          id="table1"
          v-model="selected"
          :headers="desHeaders"
          :items="items"
          return-object
          show-select
        >
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="12">
      <h1>Table 2</h1>
      <v-card class="card-table-2" elevation="0">
        <div id="icon2" class="hide-icon">
          <img id="icon" width="150" :src="DropDown" />
        </div>
        <v-data-table
          id="table2"
          v-model="desSelected"
          :items="desItems"
          :headers="desHeaders"
          return-object
          show-select
        >
        </v-data-table>
      </v-card>
    </v-col>

    <v-data-table
      id="previewTable"
      v-model="dragIds"
      :items="dragIds"
      return-object
      show-select
    ></v-data-table>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from '@/assets/drop-down.gif'

export default defineComponent({
  name: 'ActiveSessionList',
  data() {
    return {
      desHeaders: [
        { title: 'Name', key: 'name' },
        { title: 'Location', key: 'location' },
        { title: 'Height', key: 'height' },
        { title: 'Base', key: 'base' },
        { title: 'Volume', key: 'volume' }
      ],
      desSelected: [],
      DropDown,
      desItems: [
        {
          id: 4,
          name: '🍌 Banana4',
          location: 'Ecuador',
          height: '0.2',
          base: '0.05',
          volume: '0.0002'
        },
        {
          id: 5,
          name: '🍇 Grapes4',
          location: 'Italy',
          height: '0.02',
          base: '0.02',
          volume: '0.00001'
        }
      ] as any,
      selected: [],
      items: [
        {
          id: 1,
          name: '🍎 Apple',
          location: 'Washington',
          height: '0.1',
          base: '0.07',
          volume: '0.0001'
        },
        {
          id: 2,
          name: '🍌 Banana',
          location: 'Ecuador',
          height: '0.2',
          base: '0.05',
          volume: '0.0002'
        },
        {
          id: 3,
          name: '🍇 Grapes',
          location: 'Italy',
          height: '0.02',
          base: '0.02',
          volume: '0.00001'
        }
      ],
      dragIds: [] as any
    }
  },
  mounted() {
    setTimeout(() => {
      this.initializeDragAndDrop()
    }, 500)
  },
  methods: {
    // Function to initialize drag and drop functionality
    initializeDragAndDrop() {
      const _self = this

      const table1 = document.querySelector('#table1')
      const table1Rows = document.querySelectorAll('#table1 tbody tr')
      const table2 = document.querySelector('#table2')
      const table2Rows = document.querySelectorAll('#table2 tbody tr')
      const icon1 = document.querySelector('#icon1')
      const icon2 = document.querySelector('#icon2')

      if (table1) {
        table1.addEventListener('dragover', function (event: any) {
          event.preventDefault()
          _self.hidePreviewTable()
        })
        table1.addEventListener('drop', function () {
          _self.dragIds.forEach(function (item: any) {
            if (!_self.doesObjectExist(_self.items, item.id)) {
              _self.items.push(item)
            }
          })

          // Remove data after drop to another table
          _self.desItems = _self.desItems.filter(
            (desItem: any) => !_self.dragIds.some((dItem: any) => dItem.id === desItem.id)
          )

          setTimeout(() => {
            const table1Rows = document.querySelectorAll('#table1 tbody tr')
            _self.generateDraggable(_self, table1Rows)

            const table2Rows = document.querySelectorAll('#table2 tbody tr')
            _self.generateDraggable(_self, table2Rows, false)
          }, 500)
        })
      }

      if (table2) {
        table2.addEventListener('dragover', function (event) {
          event.preventDefault()
          _self.hidePreviewTable()
        })

        table2.addEventListener('drop', function () {
          _self.dragIds.forEach(function (item: any) {
            if (!_self.doesObjectExist(_self.desItems, item.id)) {
              _self.desItems.push(item)
            }
          })

          // Remove data after drop to another table
          _self.items = _self.items.filter(
            (desItem: any) => !_self.dragIds.some((dItem: any) => dItem.id === desItem.id)
          )

          setTimeout(() => {
            const table2Rows = document.querySelectorAll('#table2 tbody tr')
            _self.generateDraggable(_self, table2Rows, false)

            const table1Rows = document.querySelectorAll('#table1 tbody tr')
            _self.generateDraggable(_self, table1Rows)
          }, 500)
        })
      }

      _self.generateDraggable(_self, table1Rows)
      _self.generateDraggable(_self, table2Rows, false)
    },
    generateDraggable(_self: any, rows: any, isSourceTable: boolean = true) {
      _self.setRowDraggable(
        rows,
        (event: any, row: any) => {
          // dragStart
          if (isSourceTable) {
            _self.setDragIds(_self.selected, _self.items, row)
          }
          if (!isSourceTable) {
            _self.setDragIds(_self.desSelected, _self.desItems, row)
          }

          const elDragPreview = _self.createDragPreview(event)
          event.dataTransfer.setDragImage(elDragPreview, 0, 0)

          // Apply style after drag start
          if (isSourceTable) {
            table2.classList.add('add-border', 'apply-opacity')
            icon2.classList.add('icon-container')
            icon2.classList.remove('hide-icon')
          } else {
            table1.classList.add('add-border', 'apply-opacity')
            icon1.classList.add('icon-container')
            icon1.classList.remove('hide-icon')
          }
        },
        (event: any, row: any) => {
          // dragEnd
          _self.hidePreviewTable()
          _self.dragIds = []
          _self.selected = []
          _self.desSelected = []
          // remove style after drag end
          if (isSourceTable) {
            table2.classList.remove('add-border', 'apply-opacity')
            icon2.classList.remove('icon-container')
            icon2.classList.add('hide-icon')
          } else {
            table1.classList.remove('add-border', 'apply-opacity')
            icon1.classList.remove('icon-container')
            icon1.classList.add('hide-icon')
          }
        }
      )
    },
    setRowDraggable(rows: any, onDragStart: any, onDragEnd: any) {
      rows.forEach((row: any, index: any) => {
        row.setAttribute('index', index) // set Index
        row.setAttribute('draggable', 'true') // Make rows draggable

        // Event listener for drag start
        row.addEventListener('dragstart', function (event: any) {
          if (onDragStart) {
            onDragStart(event, row)
          }
        })

        // Event listener for drag end
        row.addEventListener('dragend', function (event: any) {
          if (onDragEnd) {
            onDragEnd(event, row)
          }
        })
      })
    },
    setDragIds(selectedItems: any, totalItems: any, row: any) {
      const item = totalItems[row.getAttribute('index') as any]
      // if check box is clicked process with it
      if (selectedItems.length > 0) {
        this.dragIds = selectedItems
      } else {
        this.dragIds = [item]
      }
    },
    hidePreviewTable() {
      const main: any = document.querySelector('#previewTable')
      main.style.display = 'none'
    },
    doesObjectExist(items: any, id: any) {
      return items.some((item: any) => item.id == id)
    },
    createDragPreview(event: any) {
      const main: any = document.querySelector('#previewTable')
      main.style.display = 'block'
      main.style.left = '100%'
      main.style.top = (event.clientY * 80) / 100 + 'px'
      main.style.display = 'block'
      return main
    }
  }
})
</script>

<style lang="scss" scoped>
:deep #table1 tbody tr[draggable='true'] {
  cursor: move;
}
:deep #previewTable {
  display: none;
  position: absolute;
  pointer-events: none;
  z-index: 100;
  left: 0px;
  top: 0px;
  width: 65%;
  cursor: move;
  tr {
    box-shadow: inset 0 0 10px white;
    opacity: 1;
  }
  .v-data-table-footer,
  thead,
  .v-data-table-rows-no-data {
    display: none;
  }
}
:deep .on-drop-active {
  background-color: red !important;
  opacity: 0.5;
}
:deep .hide-icon {
  display: none;
}
:deep .apply-opacity {
  opacity: 0.5 !important;
}
:deep .add-border {
  border: 2px rgb(10, 149, 241) solid;
}
:deep .icon-container {
  opacity: 1 !important;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
