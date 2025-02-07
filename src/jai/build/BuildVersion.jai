buildValidateJaiVersion :: () {
	versionInfo: Version_Info;
	compiler_get_version_info(*versionInfo);
	VERSION_ERROR_MESSAGE := tprint("requires jai version %.%.%", VERSION_MAJOR, VERSION_MINOR, VERSION_MICRO);
	assert(versionInfo.major == VERSION_MAJOR, VERSION_ERROR_MESSAGE);
	assert(versionInfo.minor == VERSION_MINOR, VERSION_ERROR_MESSAGE);
	assert(versionInfo.micro == VERSION_MICRO, VERSION_ERROR_MESSAGE);
}

#scope_file

VERSION_MAJOR :: 0;
VERSION_MINOR :: 2;
VERSION_MICRO :: 8;
