<template>
  <div class="relative">
    <h1 class="text-lg text-sky-950 font-bold mb-4">Paramètres de la salle {{ roomNumber }}</h1>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="formValue.tempMin"
              value="12"
              label="Température min"
              color="primary"
              filled
              dense
              prefix="°C"
              reverse
              :rules="inputRule"
            ></v-text-field>

          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="formValue.tempMax"
              label="Température max"
              filled
              dense
              prefix="°C"
              reverse
              :rules="inputRule"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="formValue.humidityMin"
              label="Taux d'humidité min"
              color="blue darken-2"
              filled
              dense
              prefix="%"
              reverse
              :rules="inputRule"
            ></v-text-field>

          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="formValue.humidityMax"
              label="Taux d'humidité max"
              filled
              dense
              prefix="%"
              reverse
              :rules="inputRule"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="formValue.soundLevelMin"
              label="Niveau sonore min"
              color="blue darken-2"
              filled
              dense
              prefix="db"
              reverse
              :rules="inputRule"
            ></v-text-field>

          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="formValue.soundLevelMax"
              label="Niveau sonore max"
              filled
              dense
              prefix="db"
              reverse
              :rules="inputRule"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-btn
          :disabled="!valid"
          :loading="formPending"
          class="mt-4"
          @click="validate"
        >
          Envoyer
        </v-btn>
      </v-container>

    </v-form>
    <div v-if="serverError" class="absolute top-3 left-1/2 alert_error">
      <v-alert
        color="red"
        elevation="2"
        type="error"
        dismissible
      >&nbsp;Une erreur s'est produite&nbsp;
      </v-alert>
    </div>
    <div v-if="formSuccess" class="absolute top-3 left-1/2 alert_error">
      <v-alert
        color="green"
        elevation="2"
        type="success"
        dismissible
      >&nbsp;Les informations ont bien été enregistrées&nbsp;
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "movieRoomSettings",
  layout: "DefaultLayout",
  data() {
    return {
      roomNumber: "N/A",
      valid: true,
      formValue: {
        tempMin: null,
        tempMax: null,
        humidityMin: null,
        humidityMax: null,
        soundLevelMin: null,
        soundLevelMax: null,
      },
      inputRule: [
        v => !!v || 'Le champ ne peux pas être vide',
        v => /^(\d+(?:[\.\,]\d+)?)$/.test(v) || 'Format incorect. exemple : 22.5' ,
      ],
      data: null,
      serverError: false,
      formSuccess: false,
      formPending: false,
    }
  },
  methods: {
    validate() {
      this.formPending = true;
      this.$refs.form.validate()
      let formJSON = `{
          "temperature": {
              "room": ${this.roomNumber},
              "sensorType": "temperature",
              "sensorValueMin": ${this.formValue.tempMin},
              "sensorValueMax": ${this.formValue.tempMax}
          },
          "humidity": {
              "room": ${this.roomNumber},
              "sensorType": "humidity",
              "sensorValueMin": ${this.formValue.humidityMin},
              "sensorValueMax": ${this.formValue.humidityMax}
          },
          "sound": {
              "room": ${this.roomNumber},
              "sensorType": "sound",
              "sensorValueMin": ${this.formValue.soundLevelMin},
              "sensorValueMax": ${this.formValue.soundLevelMax}
          }
      }`;
      this.$api.setSensorsRanges(this.roomNumber, JSON.parse(formJSON))
        .then((res) => {
            this.formSuccess=true;
        }).catch((err) => {
        console.log(err);
        this.serverError = true;
      }).finally(() => {
        this.formPending = false;
      });
    },
    displayData() {
      this.$api.getSensorsRanges(this.roomNumber)
        .then((res) => {
          this.data = res.sensorRanges;
          this.formValue.tempMin = this.data.temperature.sensorValueMin;
          this.formValue.tempMax = this.data.temperature.sensorValueMax;
          this.formValue.humidityMin = this.data.humidity.sensorValueMin;
          this.formValue.humidityMax = this.data.humidity.sensorValueMax;
          this.formValue.soundLevelMin = this.data.sound.sensorValueMin;
          this.formValue.soundLevelMax = this.data.sound.sensorValueMax;
        })
        .catch((err) => {
          console.log(err);
          this.serverError = true;
        });
    }
  },
  created() {
    this.roomNumber = this.$route.params.id;
    this.displayData();

  }
}
</script>

<style scoped>

</style>
