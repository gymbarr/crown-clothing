import DirectoryItem from "../directory-item/directory-item"

import { DirectoryContainer } from "./directory.styles"

const Directory = ({ directories }) => {
  return (
    <DirectoryContainer>
      {directories.map((directory) => (
        <DirectoryItem key={directory.id} directory={directory} />
      ))}
    </DirectoryContainer>
  )
}

export default Directory
