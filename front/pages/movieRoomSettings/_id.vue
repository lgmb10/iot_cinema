<template>
  <div>
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
              label="Température min"
              color="primary"
              filled
              dense
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
              :rules="inputRule"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-btn
          :disabled="!valid"
          class="mt-4"
          @click="validate"
        >
          Envoyer
        </v-btn>
      </v-container>

    </v-form>
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
      inputRule : [v => !!v || 'Le champ ne peux pas être vide'],
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      console.log(JSON.stringify(this.formValue))
    },
  },
  created() {
    this.roomNumber = this.$route.params.id;
  }
}
</script>

<style scoped>

</style>
