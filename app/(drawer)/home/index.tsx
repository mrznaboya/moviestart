import { ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { Input, ScrollView, Spinner, YStack } from 'tamagui';
import { Container, Title, Main, Subtitle } from '@/tamagui.config';
import { useQuery } from '@tanstack/react-query';
import { getSearchResuts, getTrending } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import useDebounce from '@/utils/useDebounce';

const Page = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 300);

  const trendingQuery = useQuery({
    queryKey: ['trending'],
    queryFn: getTrending,
  });

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResuts(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
        }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title
              color={'#FFF'}
              enterStyle={{
                opacity: 0,
                scale: 1.5,
                y: -10,
              }}
              animation={'quick'}>
              Trending
            </Title>
            <Input
              placeholder="Search for a movie, tv show, person..."
              placeholderTextColor={'#FFF'}
              borderWidth={1}
              size={'$4'}
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>

      <Subtitle
        padding={10}
        enterStyle={{
          opacity: 0,
        }}
        animation="lazy">
        {searchQuery.data?.results ? 'Search Results:' : 'Trending'}
      </Subtitle>

      {(trendingQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color={'$blue10'} paddingVertical={14} />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        paddingVertical={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results ? (
          <>{searchQuery.data?.results.map((item) => <MovieCard key={item.id} movie={item} />)}</>
        ) : (
          <>
            {trendingQuery.data?.results && (
              <>
                {trendingQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </Main>
  );
};

export default Page;
