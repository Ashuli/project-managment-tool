<template>
  <div class="flex flex-wrap container mt-4">
    <List v-for="(entry, i) in entries" :key="i" :entry="entry">
      <template v-slot:default="{
         name, description, avatar, handlers, cost, entry,
         status, statusColors, contributors, type, level,
          rate, date, discount, catalogName
        }">
        <div class="px-4 py-2 flex items-center w-full">
          <div class="flex" v-if="avatar">
            <Avatar :size="avatarSize" :avatarUrl="avatar" :name="'label'" />
          </div>
          <div class="flex flex-col px-3 text-textMedium mr-16 text-13 truncate">
            <h4 v-if="name" class="text-textMedium text-15 font-bold flex items-center">
              <span>{{ name }}</span> <span class="px-2" v-if="level">-</span> <span class="text-sm font-normal text-textLight" v-if="level">{{ level }}</span>
              <span class="block mx-2 rounded-full h-1 w-1 bg-textLight" v-if="catalogName"></span> <span class="text-sm font-normal text-textLight" v-if="catalogName">{{ catalogName }}</span>
              </h4>
            <span v-if="description" class="text-13 flex items-center"><small v-if="rate">
              <ul class="flex pr-2">
                <li v-for="count of 5" :key="count">
                  <Icon :name="'star'" :class="{ 'text-primary': count <= rate }"/>
                </li>
                <!-- <li class="pl-2">({{ numberOfRates }})</li> -->
              </ul>
            </small>{{ description }}</span>
          </div>
          <div class="flex items-center ml-auto">
            <div class="px-4" v-if="date">
              <span class="whitespace-no-wrap text-13">{{ date }}
              </span>
            </div>
            <div class="px-4" v-if="cost || cost === 0">
              <div class="flex" v-if="discount && Object.keys(discount).length">
                <span class="whitespace-no-wrap text-13 px-2 line-through">{{ cost ? cost + ' EUR': 'Free' }}</span>
                <span class="cost whitespace-no-wrap font-bold text-textMedium text-13">
                  {{ discount.newCost ? discount.newCost + ' EUR': 'Free' }}
                </span>
              </div>
              <span v-if="!discount" class="cost whitespace-no-wrap font-bold text-textMedium text-13">{{ cost ? cost + ' EUR': 'Free' }}</span>
            </div>
            <div v-if="contributors" class="flex flex-row mr-1">
              <div
                v-for="(contributor, i) of contributors"
                :key="i"
                class="-ml-1 lift flex rounded-full transition-transform duration-100"
              >
                <Avatar
                  v-if="i < 5"
                  class="cursor-pointer select-none shadow-outline-white"
                  :name="contributor.firstName"
                  :size="24"
                  :avatarUrl="contributor.path"
                  :title="checkMe(contributor)"
                />
              </div>
            </div>
            <div class="px-2" v-if="type">
              <Badge :name="type" class="uppercase">{{ type }}</Badge>
            </div>
            <div class="px-2" v-if="status">
              <Badge :color="statusColors" :name="status">{{ status }}</Badge>
            </div>
            <div v-if="handlers" class="flex pl-2">
              <span v-for="(handler, i) of handlers" :title="handler.title" :key="i">
                <Icon
                  @click="$emit(handler.name, entry)"
                  class="text-textLight cursor-pointer ml-2"
                  :size="20"
                  :name="handler.icon"
                />
              </span>
            </div>
          </div>
        </div>
      </template>
    </List>
  </div>
</template>

<script>
import List from './List.vue'
// import Icon from '../shared/Icon/Icon.vue'
// import Avatar from '../shared/Avatar/Avatar.vue'
// import Badge from '../shared/Badge/Badge.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    List,
    // Icon,
    // Avatar,
    // Badge
  },
  props: {
    entries: {
      type: Array,
      default: []
    },
    avatarSize: {
      type: Number,
      default: 48
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    checkMe(contributor) {
      return contributor._id === this.getUser._id ?
       'You': contributor.firstName + ' ' + contributor.lastName
    }
  },
}
</script>
<style lang="scss" scoped>
.lift:hover {
  transform: translateY(-2px);
}
</style>