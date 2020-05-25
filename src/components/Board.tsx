import React, { useState, useEffect, useCallback } from 'react'

import { Select, Text, Flex, Button } from '@chakra-ui/core'

import { Table } from './Table'

export const Dashboard = () => {
  const [tableSize, setTableSize] = useState<number>(3)
  const [state, setState] = useState<number>(0)

  const arr = [3, 4, 5, 6]

  const updateSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableSize(parseInt(event.target.value))
  }

  const resetGame = () => {
    setState(1 - state)
  }

  const EndTable = useCallback(() => {
    return <Table size={tableSize} />
  }, [tableSize, state])

  return (
    <React.Fragment>
      <Flex direction="column" align="center" p={4}>
        <Text fontSize="5xl">Tic-Tac-Toe</Text>
        <Select
          placeholder="Select table size"
          defaultValue="3"
          onChange={updateSize}
          width="350px"
          m = {3}
        >
          {arr.map((key: number) => {
            return <option key={key.toString()}>{key}</option>
          })}
        </Select>
        <EndTable/>
        <Button
          mt={2}
          variant="outline"
          variantColor="gray"
          width="300px"
          onClick={resetGame}
        >
          reset
        </Button>
      </Flex>
    </React.Fragment>
  )
}
