<template>
  <div id="InnerNav">
    <div class="row my-2">
      <span class="col"></span>
      <h2>
        <span class="mr-2">{{ parent.fullName }}</span>
        <small :class="badge.class">{{ badge.content }}</small>
      </h2>
      <span class="col"></span>
    </div>
    <ul class="nav nav-tabs ml-4">
      <li class="nav-item">
        <router-link class="nav-link" to="list">
          <i class="fa fa-arrow-left mx-2"></i>List of Conferences
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('detail', this.parent, parent.role)" :class="[{ 'active':href.indexOf('/detail') != -1 }]">
          Detail
        </router-link>
      </li>
      <li v-if="(parent.role !== '') && (parent.role !== 'chair') && (parent.status === 'open')" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('submission', this.parent, parent.role)" :class="[{ 'active':href.indexOf('/submission') != -1 }]">
          New Submission
        </router-link>
      </li>
      <li v-if="(parent.role === 'author') && ((parent.status === 'open') || (parent.status === 'reviewing'))" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('author', this.parent, parent.role)" :class="[{ 'active':href.indexOf('/author') != -1 }]">
          Author Page
        </router-link>
      </li>
      <li v-if="(parent.role === 'PCmember') && (parent.status === 'reviewing')" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('review', this.parent, parent.role)" :class="[{ 'active':href.indexOf('/review') != -1 }]">
         Review Paper
        </router-link>
      </li>
      <li v-if="parent.role === 'chair'" class="nav-item">
        <router-link class="nav-link" :to="confDetail.getURI('invitation', this.parent, parent.role)" :class="[{ 'active':href.indexOf('/invitation') != -1 }]">
          Invitation
        </router-link>
      </li>
      <li class="nav-item">
        <button class="nav-link btn btn-outline-primary" data-toggle="modal" data-target="#modal">
          <span v-if="parent.role === ''"><strong>Choose Your Role</strong></span>
          <span v-else>Change Your Role</span>
        </button>
      </li>
    </ul>
    <div class="modal fade" id="modal" tabindex="-1" >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Choose Your Role</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <button v-if="character === 'chair'" class="col m-4 p-4 btn btn-outline-danger"
                        @click="chooseRole('chair')" data-dismiss="modal">
                <h5>Chair</h5>
                <p>Chair can open the conference and invite PC Members.</p>
              </button>
              <button v-if="character === 'PCmember'" class="col m-4 p-4 btn btn-outline-info"
                        @click="chooseRole('PCmember')" data-dismiss="modal">
                <h5>PC Member</h5>
                <p>PC Members can review submissions.</p>
              </button>
              <button v-if="(character !== 'chair') && isAuthor" class="col m-4 p-4 btn btn-outline-success"
                        @click="chooseRole('author')" data-dismiss="modal">
                <h5>Author</h5>
                <p>Authors can check their previous submissions.</p>
              </button>
              <button v-if="character !== 'chair'" class="col m-4 p-4 btn btn-outline-primary"
                        @click="chooseRole('visitor')" data-dismiss="modal">
                <h5>Visitor</h5>
                <p>Visitors can submit papers.</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfLists from './List/ConfLists'
import ConfDetail from './Detail/ConfDetail'
import User from './User/User'

export default {
  name: 'InnerNav',
  data () {
    return {
      user: new User(),
      badge: (new ConfLists()).getBadge(this.parent.status),
      character: '',
      isAuthor: false,
      confDetail: new ConfDetail(),
          href:location.href
    }
  },
  props: ['parent'],
  methods: {
    chooseRole (role) {
      this.$router.replace({
        path: 'detail',
        query: {
          username: this.parent.username,
          fullName: this.parent.fullName,
          abbreviation: this.parent.abbreviation,
          time: this.parent.time,
          location: this.parent.location,
          submissionDDL: this.parent.submissionDDL,
          reviewReleaseDate: this.parent.reviewReleaseDate,
          status: this.parent.status,
          role: role
        }
      });
    },
    getCharacter () {
      this.$axios.get('/character', {
        params: {
          username: this.user.getUserInfo().username,
          fullName: this.parent.fullName
        }
      })
      .catch(
        error =>
        {
          this.parent.alert.popDanger('get character error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.character = res.data.character;
        }
      });
    },
    checkAuthor () {
      this.$axios.get('/submission', {
        params: {
          username: this.user.getUserInfo().username,
          author: this.user.getUserInfo().username,
          conference: this.parent.fullName
        }
      })
      .catch(
        error =>
        {
          this.parent.alert.popDanger('get submissions error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.isAuthor = (res.data.submissionList.length >= 1);
        }
      });
    }
  },
  mounted () {
    this.getCharacter();
    this.checkAuthor();
  }
}
</script>
