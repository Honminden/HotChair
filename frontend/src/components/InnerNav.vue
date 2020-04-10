<template>
  <div id="InnerNav">
    <div class="row my-2">
      <span class="col"></span>
      <h2>
        <span class="mr-2">{{ fullName }}</span>
        <small :class="badge.class">{{ badge.content }}</small>
      </h2>
      <span class="col"></span>
    </div>
    <ul class="nav nav-tabs ml-4">
      <li class="nav-item">
        <router-link class="nav-link" to="list">List of Conferences</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('detail', this, role)">Detail</router-link>
      </li>
      <li v-if="(role !== '') && (role !== 'chair') && (status === 'open')" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('submission', this, role)">New Submission</router-link>
      </li>
      <li v-if="(role === 'author') && (status === 'open')" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('submission', this, role)">Your Submissions</router-link>
      </li>
      <li v-if="role === 'chair'" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('invitation', this, role)">Invitation</router-link>
      </li>
      <li class="nav-item">
        <button class="nav-link btn btn-outline-primary" data-toggle="modal" data-target="#modal">
          <span v-if="role === ''">Choose Your Role</span>
          <span v-else>Change Your Role</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import ConfLists from './List/ConfLists'
import ConfDetail from './Detail/ConfDetail'

export default {
  name: 'InnerNav',
  data () {
    return {
      badge: (new ConfLists()).getBadge(this.status),
      confDetail: new ConfDetail()
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role']
}
</script>