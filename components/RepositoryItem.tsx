import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type RepositoryItemProps = {
  owner: string;
  repo: string;
  date: string;
  avatarUrl: string;
  ownerHtmlUrl: string;
  reposHtmlUrl: string;
};

export const RepositoryItem: React.FC<RepositoryItemProps> = ({ owner, repo, date, avatarUrl, ownerHtmlUrl, reposHtmlUrl }) => {
  const formatDate = new Date(date.substring(0, 10)).toLocaleDateString();

  const formatUrl = ( url:string ) => {
    return url.slice(8);
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: avatarUrl }} style={styles.repoAvatar} />
        <View style={styles.repoInfo}>
          <Text style={styles.repoName}>{repo}</Text>
          <Text style={styles.repoOwner}>{owner}</Text>
          <Text style={styles.urlTitle}>Proprietário</Text>
          <Text style={styles.urlText}>{formatUrl(ownerHtmlUrl)}</Text>
          <Text style={styles.urlTitle}>Repositório</Text>
          <Text style={styles.urlText}>{formatUrl(reposHtmlUrl)}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.repoDate}>Criado em: {formatDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 20,
  },
  cardFooter: {
    backgroundColor: '#f3f4f6',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
  },
  repoAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  repoInfo: {
    justifyContent: 'center',
  },
  repoName: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  repoOwner: {
    color: '#777',
    fontSize: 14,
  },
  repoDate: {
    color: '#555',
    fontSize: 12,
  }, 
  urlTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginTop: 2,
  },
  urlText: {
    fontSize: 13,
  },
});
