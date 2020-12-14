<template>
  <v-card flat>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              v-model="longUrl"
              color="indigo darken-2"
              label="Link"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="isCheck"
              color="green"
            >
              <template v-slot:label>
                <div>
                 Shorten Url
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          :disabled="!isCheck || longUrl.length == 0"
          color="primary"
          @click="shortenURL"
          v-if="!isShortened"
        >
          Shorten URL
        </v-btn>
         <v-btn
          text
          color="primary"
          @click="copyURL"
          v-else
        >
          Copy
        </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        longUrl:"",
        shortUrl:"",
        isCheck:false,
        isShortened: false
      }
    },


    methods: {
      shortenURL(){
        this.$axios.post(`/api/shorten?url=${this.longUrl}`)
        .then(result => {
          console.log(result.data)
          this.longUrl = result.data.shortURL;
          this.isShortened = true;
          })
        .catch(err => {
          console.log(err)
        })
      },
      copyURL(){
        navigator.clipboard.writeText(this.longUrl)
      },
      cancel(){
        this.longURL = "";
        this.isCheck = false;
        this.isShortened = false
      }
    },
  }
</script>
