// Chakra imports
import { border, Flex } from '@chakra-ui/react';

// Custom components

// import 'src/assets/img/Educatedd-logos.jpeg'
import logo from "assets/img/logo/logo.jpeg";
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	// let logoColor = useColorModeValue('navy.700', 'yellow');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<div>
			<img src={logo} alt="Educatedd" style={{width: 100 , height: 100 , border: 2 ,borderRadius:5,boxShadow: "3 3 5 #888" }}/>

			</div>
			
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
