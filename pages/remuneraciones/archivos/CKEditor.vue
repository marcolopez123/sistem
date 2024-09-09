<template>
  <div class="editor-container">
    <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import CKEditor from 'ckeditor4-vue';

export default {
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editorData: '',
      editorConfig: {
        toolbar: [
          { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'] },
          { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'Undo', 'Redo'] },
          { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
          '/',
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
          { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv'] },
          { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'] },
        ],
        height: 300,
        removePlugins: 'elementspath',
        resize_enabled: false,
      }
    };
  }
};
</script>

<style scoped>
.editor-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
