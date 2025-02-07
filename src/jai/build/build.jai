build :: () #compile_time {

	buildValidateJaiVersion();

	build_log_builder: String_Builder;
	set_build_options_dc(.{do_output = false});

	{
		w := compiler_create_workspace("Native");

		options := get_build_options(w);
		buildNative(w, *options);

	}

}

#run build();

#import "Basic";
#import "Compiler";
#import "File";
#import "File_Utilities";
#import "String";
#import "Hash_Table";
#import "Text_File_Handler";

#load "_index.jai";