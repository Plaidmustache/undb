import { TableFactory } from '@undb/core'
import {
  resetCurrentTableId,
  resetCurrentViewId,
  setCurrentTableId,
  setCurrentViewId,
  useGetTableQuery,
} from '@undb/store'
import type { TRPCError } from '@undb/trpc'
import { Alert, Box, Container, IconAlertCircle, ModalsProvider, Stack, useEgoUITheme } from '@undb/ui'
import { useEffect, useLayoutEffect } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { CurrentTableContext } from '../context/current-table'
import { CurrentViewContext } from '../context/current-view'
import { CreateRecordFormDrawer } from '../features/create-record-form/create-record-form-drawer'
import { TableLoading } from '../features/loading'
import { RecordSelectionDialog } from '../features/record-selection/record-selection-dialog'
import { TableToolbar } from '../features/table/table-toolbar'
import { ViewDisplay } from '../features/table/view-display'
import { UpdateRecordFormDrawer } from '../features/update-record-form/update-record-form-drawer'
import { ViewsListDrawer } from '../features/views/views-list-drawer'
import { useAppDispatch } from '../hooks'
import { modals } from '../modals'
import { useNavigate, useParams } from 'react-router-dom'

export const Table = () => {
  const { tableId, viewId } = useParams()
  const { data, isSuccess, isLoading, isError, error } = useGetTableQuery({ id: tableId! })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useEgoUITheme()

  useEffect(() => {
    unstable_batchedUpdates(() => {
      dispatch(setCurrentTableId(tableId!))
      dispatch(setCurrentViewId(viewId || undefined))
    })
  }, [tableId, viewId])

  useLayoutEffect(() => {
    if (isSuccess && !data) {
      unstable_batchedUpdates(() => {
        dispatch(resetCurrentTableId())
        dispatch(resetCurrentViewId())
      })
    }
  }, [])

  if (isLoading && tableId) {
    return <TableLoading />
  }

  if (isError) {
    return (
      <Container>
        <Alert icon={<IconAlertCircle size={16} />} title="Oops! Get Table Error!" mt="lg" color="red">
          {(error as TRPCError).message}
        </Alert>
      </Container>
    )
  }

  if (!data) {
    dispatch(resetCurrentTableId())
    navigate('/', { replace: true })
    return null
  }
  const table = TableFactory.fromQuery(data)
  const view = table.mustGetView(viewId)

  return (
    <CurrentTableContext.Provider value={table}>
      <CurrentViewContext.Provider value={view}>
        <ModalsProvider modals={modals as any}>
          <Box h="calc(100% - 90px)">
            <TableToolbar />
            <Box w="100%" h="calc(100% - 40px)" bg={theme.white} sx={{ flex: '1 1 auto' }}>
              <ViewDisplay />
            </Box>

            <CreateRecordFormDrawer />
            <UpdateRecordFormDrawer />
            <ViewsListDrawer />

            <RecordSelectionDialog />
          </Box>
        </ModalsProvider>
      </CurrentViewContext.Provider>
    </CurrentTableContext.Provider>
  )
}

export default Table
