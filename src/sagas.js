import { put, take, takeLatest, all, delay, fork, call, race } from 'redux-saga/effects'
import { inputClear } from "./actions";

export function* watchFetchPlanets() {
  const { response, cancel } = yield race({
    response: takeLatest('INPUT_CHANGE', fetchPlanets),
    cancel: take(inputClear)
  })
}

export function* fetchPlanets(action) {

  yield put({ type: 'INPUT_CHANGED', searchInputValue: action.searchInputValue});
  if (!action.searchInputValue) return

  // Small delay added so we can wait for user to finish typing and not send unnecessary requests
  yield delay(200);
  let url = `https://swapi.co/api/planets/?search=${action.searchInputValue}`,
  conditional = true;

  while(conditional) {
    yield put({type: 'PLANETS_PAGE_FETCH_START'})

    const data = yield call(() => {
      return fetch(url)
        .then(res => res.json())
      }
    );
      console.log(data)

    yield put({type: 'PLANETS_PAGE_FETCHED', autocompletePlanets: data.results})
    data.next ? url = data.next : conditional = false;
  }
    yield put({type: 'ALL_PLANETS_FETCHED'})

}
















/*


function* watchPlanetsRequest() {
  yield takeLatest('PLANETS_FETCH_START', getPlanets)
}

function* getPlanets(action) {
  let res = yield fetch(action.url)
    .then(res => res.json())
  window.a = res

}



*/

















/*
async function fetchMultiplePages(action) {
  console.log(action);
  let result = [],
  nextSearchQuery = action.query;

  // Here we can decide how much requests for one input we do.
  // Now we get every planet, but if we engage heavier API's - consider changing this to for loop with set count
  let fetchedData = await fetchHelper(nextSearchQuery);
  put({type: 'PLANET_PAGE_FETCHED', result: fetchedData.results})
  if (fetchedData.next) {
  }
}

async function fetchHelper(searchQuery) {
  return fetch(searchQuery)
    .then(res => res.json())
}


*/



export default function* rootSaga() {
  yield all([
    watchFetchPlanets(),
    //watchPlanetsRequest()
  ])
}