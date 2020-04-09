<template>
  <div id="Detail">
    <Navbar/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="row">
      <div class="container col-sm-10">
        <ul class="nav nav-tabs col-sm-5">
          <li class="nav-item">
            <router-link class="nav-link" to="list">List of Conferences</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="detail">Details</router-link>
          </li>
          <li v-if="(role !== '') && (role !== 'chair') && (status === 'open')" class="nav-item">
            <router-link class="nav-link" to="submission">Submit Paper</router-link>
          </li>
          <li v-if="(role === 'author') && (status === 'open')" class="nav-item">
            <router-link class="nav-link" to="">Your Submissions</router-link>
          </li>
          <li v-if="role === 'chair'" class="nav-item">
            <router-link class="nav-link" to="invitation">Invitation</router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-outline-primary" data-toggle="modal" data-target="#modal">
              <span v-if="role === ''">Choose Your Role</span>
              <span v-else>Change Your Role</span>
            </button>
          </li>
        </ul>
        <div class="container col-sm-7">
          <div class="row" style="margin-top: 35px">
            <span class="col"></span>
            <h2>
              <span class="mr-2">{{ fullName }}</span>
              <small :class="badge.class">{{ badge.content }}</small>
            </h2>
            <span class="col"></span>
          </div>
          <table class="table">
            <tbody>
            <tr>
              <th scope="row">Abbreviation</th>
              <td>{{ abbreviation }}</td>
            </tr>
            <tr>
              <th scope="row">Chair</th>
              <td>{{ username }}</td>
            </tr>
            <tr>
              <th scope="row">Date and time</th>
              <td>{{ time }}</td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td>{{ location }}</td>
            </tr>
            <tr>
              <th scope="row">Submission Deadline</th>
              <td>
                <span>{{ submissionDDL }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row">Review Release Date</th>
              <td>{{ reviewReleaseDate }}</td>
            </tr>
            <tr v-if="(role === 'chair') && (status === 'passed')">
              <th scope="row"></th>
              <td><button class="btn btn-success" @click="openConference()">Open this conference</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Choose Your Character</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <button v-if="character === 'chair'" class="col mx-2 btn btn-outline-danger" 
                        @click="chooseRole('chair')" data-dismiss="modal">
                <h5>Chair</h5>
                <p>Chair can open the conference and invite PC Members.</p>
              </button>
              <button v-if="character === 'PCmember'" class="col mx-2 btn btn-outline-info" 
                        @click="chooseRole('PCmember')" data-dismiss="modal">
                <h5>PC Member</h5>
                <p>PC Members can review submissions.</p>
              </button>
              <button v-if="character !== 'chair'" class="col mx-2 btn btn-outline-success" 
                        @click="chooseRole('author')" data-dismiss="modal">
                <h5>Author</h5>
                <p>Authors can check their previous submissions.</p>
              </button>
              <button v-if="character !== 'chair'" class="col mx-2 btn btn-outline-primary" 
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
import Navbar from './Navbar'
import Alert from './Message/Alert'
import User from './User/User'
import ConfLists from './List/ConfLists'

export default {
  name: 'Detail',
  data () {
    return {
      user: new User(),
      alert: new Alert(),
      badge: (new ConfLists()).getBadge(this.status),
      character: ''
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    'Navbar': Navbar
  },
  methods: {
    chooseRole (role) {
      this.$router.replace({
        path: 'detail',
        query: {
          username: this.username,
          fullName: this.fullName,
          abbreviation: this.abbreviation,
          time: this.time,
          location: this.location,
          submissionDDL: this.submissionDDL,
          reviewReleaseDate: this.reviewReleaseDate,
          status: this.status,
          role: role
        }
      });
    },
    openConference () {
      this.$axios.put('/conference', {
        username: this.user.getUserInfo().username,
        fullName: this.fullName,
        status: 'open'
      })
      .catch(
        error =>
        {
          this.alert.popDanger('status put error');
        }
      )
      .then(res =>
      {
        if(res && res.status === 200)
        {
          this.alert.popSuccess('open success');
          setTimeout(() => 
          {
            this.$router.replace({
              path: 'detail',
              query: {
                username: this.username,
                fullName: this.fullName,
                abbreviation: this.abbreviation,
                time: this.time,
                location: this.location,
                submissionDDL: this.submissionDDL,
                reviewReleaseDate: this.reviewReleaseDate,
                status: 'open',
                role: this.role
              }
            }, () => {
              this.$router.go();
            });
          }, 1500);
        }
      });
    },
    getCharacter () {
        this.$axios.get('/character', {
          params: {
            username: this.user.getUserInfo().username,
            fullName: this.fullName
          }
        })
        .catch(
          error =>
          {
            this.alert.popDanger('get character error');
          }
        )
        .then(res =>
        {
          if(res && res.status === 200)
          {
            this.character = res.data.character;
          }
        });
    }
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
    this.getCharacter();
  }
}

</script>
