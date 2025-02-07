buildNative :: (w: Workspace, options: *Build_Options) {
	options.output_path = "../bin/";
	make_directory_if_it_does_not_exist(options.output_path);
	options.output_executable_name = "polygon-next-server";
	#if #exists(JAILS_DIAGNOSTICS_BUILD) options.output_type = .NO_OUTPUT;

	import_paths: [..]string;
	// Add our own modules folder first so that we can override modules with our own version, if necessary.
	array_add(*import_paths, tprint("%/../src/modules", #filepath));
	for options.import_path array_add(*import_paths, it);
	options.import_path = import_paths;

	set_build_options(options, w);

	compiler_begin_intercept(w);

	add_build_file("../src/main.jai", w);

	compiler_end_intercept(w);
}