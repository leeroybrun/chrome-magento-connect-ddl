module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		archive_name: 'magento-connect-ddl-<%= pkg.version %>',
		jshint: {
			all: ['gruntfile.js', 'js/inject.js'],
			gruntfile: ['gruntfile.js']
		},
		concat: {
			options: {
				separator: '\n\n',
			},
			js: {
				files: {
					'inject.js': [
						'src/jquery*.js',
						'src/inject.js'
					]
				}
			}
		},
		watch: {
			gruntfile: {
				files: 'gruntfile.js',
				tasks: ['jshint:gruntfile'],
				options: {
					spawn: false,
				}
			},
			js: {
				files: ['src/*.js'],
				tasks: ['build'],
				options: {
					spawn: false,
				}
			}
		},

		clean: {
            pre: ['dist/', 'build/'],
            post: ['<%= archive_name %>.zip', 'build/']
        },

        compress: {
            main: {
                options: {
                    archive: '<%= archive_name %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['_locales/**'], dest: 'build/'},
                    {expand: true, src: ['icons/**'], dest: 'build/'},
                    {expand: true, src: ['inject.js'], dest: 'build/'},
                    {expand: true, src: ['LICENCE'], dest: 'build/'},
                    {expand: true, src: ['manifest.json'], dest: 'build/'},
                    {expand: true, src: ['README.md'], dest: 'build/'}
                ]
            },
            archive: {
                files: [
                    {expand: true, src: ['<%= archive_name %>.zip'], dest: 'dist/'}
                ]
            }
        },
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('build', ['jshint', 'concat:js']);

	grunt.registerTask('bundle', ['clean:pre', 'build', 'copy:main', 'compress', 'copy:archive', 'clean:post']);

};