import { Progress, Text, useColorModeValue } from '@chakra-ui/react';
import Project1 from 'assets/img/profile/Project1.png';
import Project2 from 'assets/img/profile/Project2.png';
import Card from 'components/card/Card';
import { type } from 'os';
import Project from 'views/admin/profile/components/Project';

type Props = {
    title: string;
    description: string;
    pdfDetails: string;
}

function Details() {
    //{ title , description , pdfDetails}:Props
	// const { title,description ,pdfDetails} = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	return (
		<Card mb={{ base: '0px', '2xl': '20px' }}>
            <Progress value={100}/>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px' mb='4px'>
                  {"title"}
			</Text>
			<Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
				{"description"}
			</Text>
			<Project
				boxShadow={cardShadow}
				mb='20px'
				image={Project1}
				ranking='1'
				link='#'
				title='Technology behind the Blockchain'
			/>
			<Project
				boxShadow={cardShadow}
				mb='20px'
				image={Project2}
				ranking='2'
				link='#'
				title='Greatest way to a good Economy'
			/>
			
		</Card>
	);
}

export default Details;
