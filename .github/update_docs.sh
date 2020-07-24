#!/bin/bash
setup_git() {
  git checkout ${TRAVIS_BRANCH}
  git config --global user.email "travis@travis-ci.com"
  git config --global user.name "Travis CI"
  git config --global push.default current
}

publish_docs() {
  git add docs/.
  git commit -m "chore(automated): Docs Update ${TRAVIS_BUILD_NUMBER} [ci skip]"
  git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git
}

if [ $(git tag --points-at HEAD) ]; then
  setup_git
  echo Regenerating documentation:
  npm run build-docs
  publish_docs
else
  echo Skipping doc regeneration since no new tag was created.
fi
