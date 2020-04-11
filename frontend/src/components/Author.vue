<template>
  <div id="Author">
    <Navbar/>
    <InnerNav :parent="this"/>
    <div v-show="alert.isVisible" :class="alert.type">
      {{ alert.content }}
    </div>
    <div class="row mt-4">
      <div class="col-2"></div>
      <div class="col-8">
        <table class="table table-hover">
          <tbody>
            <tr>
              <th scope="row">Title</th>
              <td><h4>A Survey on Deep Three-Row Eliminating T-Spins</h4></td>
            </tr>
            <tr>
              <th scope="row">Abstract</th>
              <td>
                <p>
                  A
                  Air TSD
                  Albatross Special
                  Amino TSD
                  Anchor Set
                  Antifate TSD
                  B
                  BT Cannon
                  Back-to-Back T-Spin Triple
                  Black Cross
                  Black Tea Cannon
                  Blink SZ Prop
                  C
                  C-Spin
                  Cut copy
                  D
                  DC-Spin
                  DPC Setups
                  DSTSD
                  Dodo
                  Donating
                  Double Triple Cannon 2
                  Double Triple Cannon Setups
                  DoubleYou
                  Dragon Special
                  E
                  EZ T-Spin Single Base Setups
                  EZ T-Spin Single Setups
                  EZ T-Spin Single Wall Setups
                  Extra T-Spin Cannon
                  F
                  Fiddlesworth
                  FinT Cannon
                  Flamingo
                  Fractal
                  G
                  Gamushiro Stacking
                  Godspin
                  Grim Grotto
                  H
                  Hachispin
                  Hamburger
                  HeboMAI Spin
                  Honey Cup
                  Hummingbird
                  Hyper Fractal
                  I
                  Imperial Cross
                  Imperial Cross Setups
                  Infinite TST
                  J
                  JZ/LS Stacking
                  Jigsaw
                  K
                  Kaidan Setups
                  King Crimson
                  M
                  MKO Stacking
                  Magic Key
                  May
                  Mechanical TSD Setups
                  Mini Triple Double
                  Mochi's Anger
                  Mr. T-Spin's STD
                  N
                  New DT Cannon
                  Nil-cross
                  Nuki
                  Number One
                  O
                  Okey-Cannon
                  Old Key
                  Opener
                  P
                  PC-Spin
                  Parapet
                  Pelican Opener
                  Perfect DT
                  Polymer T-Spins
                  Powerstacking
                  Prophecy T-Spin Double
                  Prototypes
                  Purple Rain Setups
                  R
                  Regular T-Spin Single Overhang Setups
                  Regular T-Spin Single Setups
                  Regular T-Spin Single Skimming Setups
                  Regular T-Spin Single Wall Setups
                  S
                  SBSD
                  ST Stacking
                  ST Stacking Setups
                  STMB Cave
                  S cont.
                  STSD
                  STSD+
                  SZ Cross
                  SZ Double Triple Setups
                  Sailboat
                  Seagull Special
                  Sewer
                  Shachiku Train
                  Shadow Blade
                  Shallow Grave
                  Single Double (SD1)
                  Single Triple Cannon
                  Single Triple Double
                  Sky Prop
                  Special Triple Triple
                  Super Spiral
                  T
                  T-Spin Combo Hybrid
                  T-Spin Double Base Setups
                  T-Spin Double Overhang Setups
                  T-Spin Double Setups
                  T-Spin Forecast
                  T-Spin Guide
                  T-Spin Mini Double
                  T-Spin Single
                  T-Spin Single Setups
                  T-Spin Snaking
                  T-Spin Triple Base Setups
                  T-Spin Triple Overhang Setups
                  T-Spin Triple Setups
                  TKI 3 Opening
                  Trinity
                  Triple Donation Double Attack Setups
                  Triple Double Attack Setups
                  Triple Triple PC
                  Trustworthy DT
                  W
                  WolfMoon Cannon
                  X
                  XZ Cannon
                  Y
                  Yoshihiro SD Setups
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">File</th>
              <td>
                <span>
                  A_Survey_on_Deep_T-Spins.pdf
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import InnerNav from './InnerNav'
import Alert from './Message/Alert'
import User from './User/User'

export default {
  name: 'Author',
  data () {
    return {
      user: new User(),
      alert: new Alert()
    }
  },
  props: ['username', 'fullName', 'abbreviation', 'time', 'location', 'submissionDDL', 'reviewReleaseDate', 'status', 'role'],
  components:
  {
    'Navbar': Navbar,
    'InnerNav': InnerNav
  },
  methods: {
  },
  mounted () {
    document.title += ` - ${this.fullName}`;
  }
}

</script>