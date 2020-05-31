import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDependency = state => state.dependency || initialState

const selectDependencyData = createSelector(
    selectDependency,
    dependency => dependency.data
)

export {selectDependency, selectDependencyData}