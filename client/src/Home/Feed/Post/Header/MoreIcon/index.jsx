import { GridItem, Icon } from "@chakra-ui/react"
import styled from "@emotion/styled"
import React from "react"
import { FiMoreHorizontal } from "react-icons/fi"

const Layout = styled(GridItem)`
display: flex;
align-items: center;
justify-content: center;
grid-area: more;
`

export default () => {
    return (
        <Layout>
            <Icon as={FiMoreHorizontal} width={30} height={30} />
        </Layout>
    )
}