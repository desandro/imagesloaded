# @desandro only

deploy:
	s3cmd -c ~/.s3cfg-fizzy sync --cf-invalidate build/. s3://imagesloaded.desandro.com/

gulp:
	gulp

prod: gulp deploy
