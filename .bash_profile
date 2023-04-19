#!/usr/bin/bash.exe
if [[ -f /c/Users/Public/OneDrive/Documents/Projects/BYU-I/trrmann.github.io/.bash_profile ]];
then
  source /c/Users/Public/OneDrive/Documents/Projects/BYU-I/trrmann.github.io/.bash_profile
fi
if [[ -d /c/Users/Public/OneDrive/Documents/Projects/BYU-I/wdd130/profile.d ]];
then
  PROFILE_SHELLS=`ls /c/Users/Public/OneDrive/Documents/Projects/BYU-I/wdd130/profile.d/*.sh 2>/dev/null|wc -l`
  if [[ ${PROFILE_SHELLS} == "" ]];
  then
    echo > /dev/null
  elif [[ ${PROFILE_SHELLS} -gt 0 ]];
  then
    for wdd130ProfileFile in `ls /c/Users/Public/OneDrive/Documents/Projects/BYU-I/wdd130/profile.d/*.sh`;
    do
      source ${wdd130ProfileFile};
    done;
  fi
fi