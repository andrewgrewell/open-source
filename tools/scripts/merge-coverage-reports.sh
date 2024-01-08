#!/bin/bash

COVERAGE_ROOT=coverage
COVERAGE_FILE_NAME=coverage-final.json
COVERAGE_PATHS=$(find $COVERAGE_ROOT -type f -name $COVERAGE_FILE_NAME)

writeToGithubOutput() {
  if [ -n "$GITHUB_OUTPUT" ]; then  # Check if GITHUB_OUTPUT is not empty
      echo "exists=$1" >> "$GITHUB_OUTPUT"
  fi
}

if [ -z "$COVERAGE_PATHS" ]; then
    echo "No coverage files found. Aborting script."
    writeToGithubOutput false
    exit 0
fi

mkdir -p coverage/_merged

# we maintain a list of projects we don't want to show up in coverage reports
# doing it as part of the merge step  is actually kind of nice because we can
# still get the report for the overall coverage in the entire monorepo, but
# it  will be broken down by project and not used for failing checks
EXCLUDED_PROJECTS=(

)
isProjectExcluded() {
  local path=$1
  for excludedProject in "${EXCLUDED_PROJECTS[@]}"; do
    if [[ "$path" == *"$excludedProject"* ]]; then
      [ "$VERBOSE" = true ] && echo "Excluded $excludedProject"
      return 0
    fi
  done
  return 1
}

while IFS= read -r line; do
  if isProjectExcluded "$line"; then
    continue
  fi
  forthPart=$(echo $line | cut -d'/' -f4)
  if [[ $forthPart == "$COVERAGE_FILE_NAME" ]]; then
    projectName=$(echo $line | cut -d'/' -f3)
    if cp "$line" coverage/_merged/"$projectName"-coverage.json; then
      [ "$VERBOSE" = true ] && echo "Merged $projectName $COVERAGE_FILE_NAME"
    fi
  else
    scope=$(echo $line | cut -d'/' -f3)
    projectName=$(echo $line | cut -d'/' -f4)
    finalName="${scope}-${projectName}"
    if cp "$line" coverage/_merged/"$finalName"-coverage.json; then
      [ "$VERBOSE" = true ] && echo "Merged $finalName $COVERAGE_FILE_NAME"
    fi
  fi
done <<<"$COVERAGE_PATHS"

npx nyc merge coverage/_merged coverage/_merged/coverage.json
npx nyc report -t coverage/_merged --reporter json-summary --reporter lcov
writeToGithubOutput true
