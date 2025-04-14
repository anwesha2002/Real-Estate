import {Box , MenuItem , Select , SelectChangeEvent , Stack , TextField , Typography} from "@mui/material";
import {BiPlus} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {useEffect , useRef , useState} from "react";
import {getProperties} from "../Network/Document_api.ts";
import {PropertyModel} from "../Models/PropertyModel.ts";
import {PropertyCard} from "../Components/Property/PropertyCard.tsx";
import {CustomButton} from "../Components/CustomButton.tsx";
import {MdArrowDownward , MdArrowDropDown , MdArrowUpward} from "react-icons/md";

const ORDER = ['asc', 'desc'] as const

export function Properties() {

    const navigate = useNavigate()
    const [ properties, setProperties ] = useState<PropertyModel[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const initialRef = useRef(0)
    const [pageSize, setPageSize] = useState<any>(0)
    var items_per_page = pageSize ? pageSize : 14
    let pageCount = Math.ceil(initialRef.current / items_per_page)
    const [order, setOrder] = useState<typeof ORDER[number]>("asc");
    const [title, setTitle] = useState("")
    const [type, setType] = useState("all")


    useEffect ( () => {
        if(initialRef.current === 0) initialRef.current = properties.length
        if(pageSize === 0 && initialRef.current > 14 ) {
            setPageSize ( 14 )
        }
    } , [properties] );

    useEffect ( () => {
        const start = currentPage > 1 ?  ( (currentPage - 1) * items_per_page   ) : 0 ;
        if(pageSize == 'Default') {
            setPageSize ( 14 )
        }
        (async()=>{
            await getProperties( { order, title, type, pageSize, start  } ).then(res=> setProperties(res))
        }) ()
    } , [order, title, type, pageSize, currentPage, items_per_page] );


    function handleSortClick(){
        setOrder((prevState)=>prevState === "asc" ?  "desc" : "asc")
    }


    return (
        <Box >

            <Box p={2} display="flex" flexWrap="wrap" gap={3}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">

                        {!properties.length ? 'There are no properties ' : "All Properties"}
                    </Typography>
                    <Box display="flex" mb={2} mt={3} justifyContent="space-between" width="84%" flexWrap="wrap">
                        <Box display="flex" gap={2} flexWrap="wrap" mb={{xs : '20px' , sm : 0}}>
                            <CustomButton
                                type="submit"
                                title={ `Sort price` }
                                sx={{backgroundColor:"#475be8", color:"#fcfcfc"}}
                                handleClick={handleSortClick}
                                icon={order === "asc" ? <MdArrowDownward size={20}/> : <MdArrowUpward size={20}/>  }
                            />
                            <TextField size="small" variant="outlined" color="info" placeholder="Serch by title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            <Select
                                IconComponent={MdArrowDropDown}
                                size="small"
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                sx={{
                                    '& .MuiSelect-icon': {
                                        display: 'block',  // Force display
                                        visibility: 'visible'
                                    }
                                }}
                                defaultValue={type}
                                onChange={(e : SelectChangeEvent)=>setType(e.target.value ? e.target.value : "all")}
                                inputProps={{'aria-label' : 'without label'}}
                            >
                                {["all", "apartment","villa","house","farmHouse" , "condos" , "townhouse", "duplex" , "studio" , "chalet"].map(item=>
                                    <MenuItem key={item}  value={item.toLowerCase()} style={{textTransform : "capitalize"}}>
                                        {item}
                                    </MenuItem>)
                                }
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Stack direction="row" justifyContent="space-between" p={2}>

                {/*<span ><BiPlus/></span>*/}
                <CustomButton icon={<BiPlus/>} sx={{backgroundColor:"#475be8", color:"#fcfcfc", display : "flex", alignItems : "center", justifyContent : "center"}} variant="contained" handleClick={()=>{navigate("/property/create")}} title="Add Property"/>
            </Stack>
            <Box mt="20px" mx={2} sx={{display : 'flex' , flexWrap : "wrap" , gap : 3}}>
                {properties.map((items)=>(
                    <PropertyCard {...items}/>
                ))}
            </Box>

            {properties.length>0 && <Box display="flex" flexWrap="wrap" mx={ 2 } mt="20px" gap={ 2 } alignItems="center">
                <CustomButton
                    title="Previous"
                    handleClick={ () => {
                        setCurrentPage ( (prevState) => prevState - 1 )
                    } }
                    sx={ { backgroundColor : "#475be8" , color : "#fcfcfc" } }
                    disabled={ !(currentPage > 1) }
                />
                <Box display={ { xs : "hidden" , sm : 'flex' } } alignItems="center"
                     gap="5px">Page{ ' ' }<strong>{ currentPage } of { pageCount }</strong></Box>
                <CustomButton
                    title="Next"
                    handleClick={ () => {
                        setCurrentPage ( (prevState) => prevState + 1 )
                    } }
                    sx={ { backgroundColor : "#475be8" , color : "#fcfcfc" } }
                    disabled={ currentPage === pageCount }
                />
                <Select
                    size="small"
                    variant="outlined"
                    color="info"
                    displayEmpty
                    required
                    defaultValue={10}
                    // value=""
                    onChange={ (e) => setPageSize(e.target.value ? Number(e.target.value) : 14) }
                    inputProps={ { 'aria-label' : 'without label' } }
                >
                    { [ 10, 20 , 30 , 40 , 50, 'Default'].map ( item => (
                        <MenuItem key={item} value={item}>{ `${ item === 'Default' ? "" : "Show" }` } { item }</MenuItem>
                    ) ) }
                </Select>
            </Box> }
        </Box>
    );
}

