require('dotenv').config();

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    awskey: process.env.AWS_KEY,
    awssecret: process.env.AWS_SECRET,
    awsbucket: process.env.AWS_BUCKET,
    s3: {
      options: {
        key: '<%= awskey %>',
        secret: '<%= awssecret %>',
        bucket: '<%= awsbucket %>',
        access: 'public-read',
        headers: {
          'Cache-Control': 'max-age=630720000, public',
          Expires: new Date(Date.now() + 63072000000).toUTCString(),
        },
      },
      dev: {
        upload: [
          {
            src: 'public/sc-comment.js',
            dest: 'sc-comment.js',
          },
          {
            src: 'client/components/comment.css',
            dest: 'comment.css',
          },
          {
            src: 'client/components/viewcomments.css',
            dest: 'viewcomments.css',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-s3');

  // Default task(s).
  grunt.registerTask('default', ['s3']);
};
