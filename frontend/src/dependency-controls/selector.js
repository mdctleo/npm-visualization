import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDependency = state => state.dependency || initialState

const selectDependencyData = createSelector(
    selectDependency,
    dependency => dependency.data
)

const selectisFetching = createSelector(
    selectDependency,
    dependency => dependency.isFetching
)

export {selectDependency, selectDependencyData, selectisFetching}