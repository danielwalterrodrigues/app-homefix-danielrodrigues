import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  homeRequest: ['area'],
  homeSuccess: ['sections'],
  homeFailure: ['error'],
  selectedSection: ['selected'],
  removedSection: ['removedIndex', 'fromDone'],
  getActualSection: ['lastSelectedIndex'],
  clean: null
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  sections: null,
  selected: null,
  actualSection: null,
  actualArea: null,
  lastSection: null,
  takiSelection: null
})

/* ------------- Selectors ------------- */

export const HomeSelectors = {
  getData: state => state.sections
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {area}) => {
  // console.log('request', state, area)
  return state.merge({ fetching: true, sections: null})
}

// successful api lookup
export const success = (state, { sections }) => {
  const { actualArea } = state;


  // console.log('success Assistance', sections)
  return state.merge({ fetching: false, error: null, sections:  sections })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, sections: null}) 


export const selected = (state, {selected}) => {
  const previousSelected = state.selected;
  const { sections, actualSection, takiSelection } = state

  let tempSelected = [];
  let nextSection
  let takiSelectionSelected
  let lastSection = actualSection ? actualSection : null

  if(!previousSelected){
    tempSelected = [
      selected
    ]
  }
  else{
    tempSelected = [
      ...previousSelected,
      selected
    ]
  }
  
  if(actualSection){
      nextSection = actualSection.options[selected]
  }
  else{
    nextSection = sections[selected]
  }

  
  if(nextSection && nextSection.hasOwnProperty('options') && _.size(nextSection.options)=== 1){
      nextSection = nextSection.options[0];
  }   
  
  if(takiSelection){
    takiSelectionSelected = takiSelection;
  }
  else{
    if(actualSection && actualSection.hasOwnProperty('taki')){
      takiSelectionSelected = actualSection.taki
    }
    else{
      takiSelectionSelected = sections[selected].hasOwnProperty('taki') ? sections[selected].taki : null
    }
  }
  
  if(lastSection && lastSection.hasOwnProperty('taki')){
    takiId = lastSection.taki;
  }
  console.log(nextSection, actualSection, takiSelectionSelected);

  return state.merge({ selected: tempSelected, actualSection: nextSection, lastSection: lastSection, takiSelection: takiSelectionSelected })
}

export const removed = (state, {removedIndex, fromDone}) => {
  console.log('removed')
  /*const { selected, actualSection, sections, lastSection  } = state;

  let tempSelected = [];
  let tempActualSection = [];

  if(!selected){
    return false;
  }

  tempSelected = [
    ...selected
  ];

  tempSelected.splice(removedIndex,1)
  
  // console.log('actualSection', actualSection, lastSection, tempSelected.length)

  return state.merge({ 
    selected: tempSelected.length ? tempSelected : null , 
    actualSection: tempSelected.length ? lastSection : null 
  })*/

  return state.merge({ 
    takiSelection: null,
    selected: null,//tempSelected.length ? tempSelected : null , 
    actualSection: null, // tempSelected.length ? lastSection : null 
  })

}

export const clean = state => {
  console.log('clean')
  return state.merge({ 
    selected: null,
    actualSection: null,
    takiSelection: null
  })

}

export const getActualSection = (state, {lastSelectedIndex}) => {
  const {sections, selected, actualSection} = state;
  let tempActualSection = null

  for (var i = 0; i < selected.length; i++) {
    if(!tempActualSection){
      tempActualSection = sections[selected[i]].hasOwnProperty('options') ? sections[selected[i]].options[0] : sections[selected[i]];
    }
    else{
      tempActualSection = tempActualSection[selected[i]].hasOwnProperty('options') ? tempActualSection[selected[i]].options[0] : tempActualSection[selected[i]];
    }
  }

  // console.log(actualSection, lastSelectedIndex)
  
  if(actualSection && !!!lastSelectedIndex){
    if(actualSection.hasOwnProperty('options') ){
      if(actualSection.options[lastSelectedIndex]){
        if(actualSection.options[lastSelectedIndex].hasOwnProperty('options')){
          tempActualSection = actualSection.options[lastSelectedIndex].options[0]
        }
        else{
          tempActualSection = actualSection.options[lastSelectedIndex]  
        }
      }
    }
    else{
      tempActualSection = actualSection[lastSelectedIndex]
    }
    //tempActualSection = actualSection.hasOwnProperty('options') ? actualSection.options[lastSelectedIndex].hasOwnProperty('options') ? actualSection.options[lastSelectedIndex].options[0] : actualSection.options[lastSelectedIndex] : actualSection[lastSelectedIndex];
  }

  
  // console.log('getActualSection', tempActualSection, lastSelectedIndex)

  return state.merge({ lastSection: actualSection, actualSection: tempActualSection})
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOME_REQUEST]: request,
  [Types.HOME_SUCCESS]: success,
  [Types.HOME_FAILURE]: failure,
  [Types.SELECTED_SECTION]: selected,
  [Types.REMOVED_SECTION]: removed,
  [Types.GET_ACTUAL_SECTION]: getActualSection,
  [Types.CLEAN]: clean,
})
