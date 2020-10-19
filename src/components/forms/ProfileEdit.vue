<template>
  <form novalidate autocomplete="off" class="w-full md:w-4/12 lg:w-4/12 m-auto text-left ">
    <div class="bg-white p-4 mt-4">
      <div class="formField">
        <label class="formFieldLabel" for="title">Title</label>
        <Select
          id="title"
          :value="form.title"
          customRender
          searchable
          @change="setFieldValue('title', $event)"
        >
          <template v-slot:default="{ label }">
            <div class="my-px mr-4 flex items-center">
              <div class="pr-1 pl-2">
                {{ label }}
              </div>
            </div>
          </template>
        </Select>
      </div>

      <div class="formField">
        <label class="formFieldLabel" for="birthDate">Birth Date</label>
        <div class="relative">
          <Input
            :value="form.birthDate"
            id="birthDate"
            type="date"
            @input="setFieldValue('birthDate', $event)"
          />
        </div>
        <div class="formFieldTip"></div>
      </div>
<!-- 
      <div class="formField">
        <label class="formFieldLabel" for="zipCode">Zipcode</label>
        <div class="relative">
          <Input
            :value="form.zipCode"
            id="zipCode"
            @input="setFieldValue('zipCode', $event)"
          />
        </div>
        <div class="formFieldTip"></div>
      </div> -->

      <div class="formField">
        <label class="formFieldLabel" for="city">City</label>
        <div class="relative">
          <Input
            :value="form.city"
            id="city"
            @input="setFieldValue('city', $event)"
          />
        </div>
        <div class="formFieldTip"></div>
      </div>

      <div class="formField">
        <label class="formFieldLabel" for="educationalLevel"
          >Educational level</label
        >
        <div class="relative">
          <Input
            :value="form.educationalLevel"
            id="educationalLevel"
            @input="setFieldValue('educationalLevel', $event)"
          />
        </div>
        <div class="formFieldTip"></div>
      </div>

      <div class="formField">
        <label class="formFieldLabel" for="employmentStatus"
          >Employment status</label
        >
        <Select
          id="employmentStatus"
          :value="form.employmentStatus"
          customRender
          searchable
          @change="setFieldValue('employmentStatus', $event)"
        >
          <template v-slot:default="{ label }">
            <div class="my-px mr-4 flex items-center">
              <div class="pr-1 pl-2">
                {{ label }}
              </div>
            </div>
          </template>
        </Select>
      </div>

      <div class="formField">
        <label class="formFieldLabel" for="reasonToJoin">Reason to join</label>
        <div class="relative">
          <Textarea
            :value="form.reasonToJoin"
            id="reasonToJoin"
            @input="setFieldValue('reasonToJoin', $event)"
          />
        </div>
        <div class="formFieldTip"></div>
      </div>

      <div class="w-full mb-6 flex justify-center">
        <Button
          class="w-full"
          :variant="'primary'"
          :disabled="!isValidDTO"
          :isWorking="isWorking"
          @click="handleSubmit"
        >
          Save
        </Button>
      </div>
    </div>
  </form>
</template>
<script>
import Input from '../shared/Input/Input.vue'
import Button from '../shared/Button/Button.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Input,
    Button
  },
  data() {
    return {
      form: {
        birthDate: '',
        city: '',
        title: '',
        educationalLevel: '',
        employmentStatus: '',
        reasonToJoin: '',
      },
      statuses: ['employed', 'unemployed'],
      titles: ['Divers', 'Herr', 'Frau'],
      loading: false,
    }
  }
}
</script>
<style lang="postcss" scoped>
.formField {
  @apply mt-5;
}
.sep {
  @apply mt-5 border border-backgroundLightest;
}
.formFieldLabel {
  @apply block pb-1-25 text-textMedium text-13 font-medium;
}
.formFieldTip {
  @apply pt-1-5 text-textMedium text-13;
}
</style>
