VERSION := $(shell cat version)
image:
	docker build  -t web_manager:$(VERSION) .
image-no-cache:
	docker build --no-cache -t web_manager:$(VERSION) .
it:
	docker run --rm -it web_manager:$(VERSION) sh
container:
	docker run --rm -p 7463:80 --name web_manager_test web_manager:$(VERSION)

