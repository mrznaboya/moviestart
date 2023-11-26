import React from 'react';
import { MediaType } from '@/interfaces/apiresults';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/services/api';
import { Main } from '@/tamagui.config';
import { H1, Image, Paragraph, ScrollView, Text, YStack } from 'tamagui';
import { ImageBackground } from 'react-native';

type DetailsPageProps = {
  id: string;
  mediaType: MediaType;
};
const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });
  return (
    <Main>
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}`,
          }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.poster_path}`,
            }}
            width={200}
            height={300}
            margin={20}
            borderRadius={6}
          />
        </ImageBackground>

        <YStack
          padding={10}
          animation={'lazy'}
          enterStyle={{
            opacity: 0,
            y: 10,
          }}>
          <H1 color={'$blue7'}>
            {movieQuery.data?.title || movieQuery.data?.name}
            <Text fontSize={16}>(2023)</Text>
          </H1>
          <Paragraph theme={'alt2'}>{movieQuery.data?.tagline}</Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
