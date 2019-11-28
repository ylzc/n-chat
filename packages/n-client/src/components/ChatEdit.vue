<template>
	<ckeditor :editor="editor" :value="value" @input="input" @ready="onReady"></ckeditor>
</template>

<script lang="ts">
	import { Vue, Component, Model, Prop } from "vue-property-decorator";
	//@ts-ignore
	import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
	//@ts-ignore
	import CKEditor from '@ckeditor/ckeditor5-vue';

	@Component({
		components: {
			ckeditor: CKEditor.component
		}
	})
	export default class ChatEdit extends Vue {
		editor = DecoupledEditor;
		@Prop({default: () => ({})}) editorConfig!: any;
		@Prop({default: ''}) value!: string;

		input(v: any) {
			this.$emit('input', v)
		}

		onReady(editor: any) {
			// Insert the toolbar before the editable area.
			editor.ui.getEditableElement().parentElement.insertBefore(
				editor.ui.view.toolbar.element,
				editor.ui.getEditableElement()
			);
		}
	}
</script>

<style scoped lang="scss">

</style>
