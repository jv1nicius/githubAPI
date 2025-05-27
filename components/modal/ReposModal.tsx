import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IRepos } from '@/interfaces/IRepos';
import { ThemedView } from '../ThemedView';

export type ReposModalProps = {
    visible: boolean;
    onAdd: (ownerId: string, repoId: string, id: number) => void;
    onCancel: () => void;
    repos?: IRepos;
}

export default function ReposModal({ visible, onAdd, onCancel, repos }: ReposModalProps) {
    const [ownerId, setOwnerId] = useState<string>('');
    const [repoId, setRepoId] = useState<string>('');
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (repos) {
            setOwnerId(repos.ownerId)
            setRepoId(repos.repoId)
            setId(repos.id)
        } else {
            setOwnerId('')
            setRepoId('')
            setId(0)
        }
    }, [repos]);

    return (
        <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={() => { }}>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.boxContainer}>
                    <Text style={styles.title}>OwnerId</Text>
                    <TextInput
                        style={styles.boxInput}
                        value={ownerId}
                        onChangeText={text => setOwnerId(text)}
                    />
                    <Text style={styles.title}>RepoId</Text>
                    <TextInput
                        style={styles.boxInput}
                        value={repoId}
                        onChangeText={text => setRepoId(text)}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(ownerId, repoId, id)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ThemedView>
            </ThemedView>
        </Modal>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0.7)',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  boxInput: {
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#DDD',
    margin: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: 20,
  }
  ,
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonAdd: {
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    padding: 20,
  },
  buttonCancel: {
    backgroundColor: 'orange',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    padding: 20,
  },
});