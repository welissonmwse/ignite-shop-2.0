import ContentLoader from "react-content-loader"

export function ProductLoader(props){
  return (
    <ContentLoader 
      speed={2}
      width={1140}
      height={500}
      backgroundColor="#202024"
      foregroundColor="#121214"
      {...props}
    >
      <rect x="136" y="0" rx="2" ry="2" width="500" height="656" /> 
      <rect x="700" y="34" rx="2" ry="2" width="400" height="25" /> 
      <rect x="700" y="90" rx="2" ry="2" width="100" height="45" /> 
      <rect x="700" y="164" rx="2" ry="2" width="400" height="15" /> 
      <rect x="700" y="200" rx="2" ry="2" width="400" height="15" /> 
      <rect x="700" y="220" rx="2" ry="2" width="400" height="15" /> 
      <rect x="700" y="240" rx="2" ry="2" width="400" height="15" /> 
      <rect x="700" y="260" rx="2" ry="2" width="400" height="15" /> 
      <rect x="700" y="430" rx="2" ry="2" width="400" height="50" /> 
    </ContentLoader>
  )
}
