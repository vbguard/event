<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link></v-toolbar-title
      >
      <v-text-field
        placeholder="Search"
        class="ml-8"
        style="max-width: 300px"
        outlined
        rounded
        dense
        hide-details
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer />
      <v-btn>Create Event</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col sm="6" offset-sm="3">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName,
    siteDescription
  }
}
</static-query>

<style scoped>
.v-toolbar__title a {
  text-decoration: none;
  color: black;
}

</style>
<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
</style>
