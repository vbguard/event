<template>
  <Layout>
    <v-tabs v-model="tab" grow>
      <v-tab>All Events</v-tab>
      <v-tab>Music</v-tab>
      <v-tab>Coding Events</v-tab>
    </v-tabs>

    <v-row class="justify-space-around">
      <v-card
        v-for="event in events"
        :key="event.node.id"
        width="300"
        class="mt-5"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        />
        <v-card-title>{{ event.node.title }}</v-card-title>
        <v-card-subtitle class="pb-0">{{
          formatDate(event.node.date)
        }}</v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange" text @click="$router.push(event.node.path)">
            More info
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  events: allEvent {
    edges {
      node {
        id
        title
        path
        description
        price
        duration
        date
        category
      }
    }
  }
}
</page-query>

<script>
import moment from "moment";

export default {
  metaInfo: {
    title: "Hello, world!",
  },
  data() {
    return {
      tab: 0,
      events: [],
    };
  },
  mounted() {
    this.events = this.$page.events.edges;
  },
  watch: {
    tab(val) {
      if (this.tab === 0) {
        this.showAllEvents();
      } else {
        this.showEventsByType(val);
      }
    },
  },
  methods: {
    showAllEvents() {
      this.events = this.$page.events.edges;
    },
    showEventsByType(val) {
      this.events = this.$page.events.edges.filter((edge) => {
        return edge.node.category === val;
      });
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
  },
};
</script>
