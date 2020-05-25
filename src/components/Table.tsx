import React, { useState, useEffect } from 'react'
import { Flex, Button, StatHelpText } from '@chakra-ui/core'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

interface ITable {
  size: number
}

interface Game {
  table: number[][],
  color: number[][],
  end: boolean,
  turn: number,
  type: boolean,
  message: string
}

const initialState: Game = {
  table: [],
  color: [],
  end: false,
  turn: 0, 
  type: null,
  message: null,
}

export const Table = (props: ITable) => {
  const [Board, setBoard] = useState<Game>(null)

  const mp: string[] = ['X', 'O', ' ']
  
  useEffect(() => {
    if( !props.size ) return

    let firstState: Game = initialState
    let table: number[][] = []
    let color: number[][] = []
    for( let i = 0 ; i < props.size ; i++ ) {
      let rowXO: number[] = [], rowColor: number[] = []
      for( let j = 0 ; j < props.size ; j++ ) {
        rowXO.push(2), rowColor.push(0)
      }
      table.push(rowXO), color.push(rowColor)
    }
    setBoard({
      ...firstState,
      table: table,
      color: color,
    })
  }, [])

  useEffect(() => {
    if( !Board || !Board.table ) return 
    if( Board.end ) return 

    for( let i = 0 ; i < props.size ; i++ ) {
      let chk = true 
      if( Board.table[i][0] === 2 ) continue
      for( let j = 0 ; j < props.size ; j++ ) 
        if( Board.table[i][j] !== Board.table[i][0] ) chk = false
      if( chk ) {
        let newColor: number[][] = Board.color
        for( let j = 0 ; j < props.size ; j++ ) newColor[i][j] = 1
        setBoard({
          ...Board, 
          color: newColor,
          end: true,
          type: true,
          message: `Player ${mp[Board.table[i][0]]} wins!`,
        }) 
        return 
      }
    }

    for( let j = 0 ; j < props.size ; j++ ) {
      let chk = true
      if( Board.table[0][j] === 2 ) continue 
      for( let i = 0 ; i < props.size ; i++ )
        if( Board.table[i][j] !== Board.table[0][j] ) chk = false
      if( chk ) {
        let newColor: number[][] = Board.color
        for( let i = 0 ; i < props.size ; i++ ) newColor[i][j] = 1 
        setBoard({
          ...Board,
          color: newColor,
          end: true,
          type: true,
          message: `Player ${mp[Board.table[0][j]]} wins!`,
        })
        return 
      }
    }
    let chk = true
    for( let i = 0 ; i < props.size ; i++ ) 
      if( Board.table[i][i] === 2 || Board.table[i][i] != Board.table[0][0] ) {
        chk = false
        break
      }
    if( chk ) {
      let newColor: number[][] = Board.color
      for( let i = 0 ; i < props.size ; i++ ) newColor[i][i] = 1
      setBoard({
        ...Board,
        color: newColor,
        end: true,
        type: true,
        message: `Player ${mp[Board.table[0][0]]} wins!`,
      })
      return
    }

    chk = true
    for( let i = 0 ; i < props.size ; i++ ) 
      if( Board.table[i][props.size-i-1] === 2 || Board.table[i][props.size-i-1] != Board.table[0][props.size-1] ) {
        chk = false
        break
      }
    if( chk ) {
      let newColor: number[][] = Board.color
      for( let i = 0 ; i < props.size ; i++ ) newColor[i][props.size-i-1] = 1
      setBoard({
        ...Board,
        color: newColor,
        end: true,
        type: true,
        message: `Player ${mp[Board.table[0][props.size-1]]} wins!`,
      })
      return 
    }

    if( Board.turn === props.size * props.size ) {
      setBoard({
        ...Board,
        end: true,
        type: false,
        message: `Draw`,
      })
    }

  }, [Board])

  if (!props.size || !Board || !Board.table  ) {
    return <React.Fragment></React.Fragment>
  }

  const update = (row: number, col: number ) => {
    if( Board.table[row][col] !== 2 ) return

    let newTable: number[][] = Board.table
    let newTurn: number = Board.turn

    newTable[row][col] = newTurn % 2
    newTurn++
    setBoard({
      ...Board,
      table: newTable,
      turn: newTurn
    })
  }

  return (
    <React.Fragment>
      <Flex direction="column" m={3}>
        {Board.table.map((row: number[], index1: number) => {
          return (
            <Flex direction="row">
              {row.map((value: number, index2: number) => {
                return (
                  <Button
                    p={0}
                    m={1}
                    width="70px"
                    height="70px"
                    fontSize="25px"
                    variant="outline"
                    isDisabled={Board.end && !Board.color[index1][index2]}
                    variantColor={
                      Board.color[index1][index2] ? "red" : "gray"
                    }
                    onClick={() => update(index1, index2)}
                  >
                    {mp[value]}
                  </Button>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
      { Board.end ? (
          <Alert status={Board.type ? "success" : "info"} variant="left-accent">
          <AlertTitle>{Board.message}</AlertTitle>
          </Alert>
      ) : null}
    </React.Fragment>
    
  )
}
