import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IRepos } from '@/interfaces/IRepos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReposModal from '@/components/modal/ReposModal';
import { RepositoryItem } from '@/components/RepositoryItem';
import axios from 'axios';
import ConfirmDeleteModal from '@/components/modal/ConfirmDeleteModal';

export default function ReposListScreen() {
    const [repos, setRepos] = useState<IRepos[]>([]);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@Repos:repos");
                const reposData = data != null ? JSON.parse(data) : [];
                setRepos(reposData);
            } catch (e) {
                console.log(e);
            }
        }

        getData();
    }, []);

    const onAdd = async (ownerId: string, repoId: string, id?: number) => {
        try {
            const response = await axios.get(`https://api.github.com/repos/${ownerId}/${repoId}`);
            const data = response.data;

            const newRepo: IRepos = {
                id: data.id,
                ownerId: ownerId,
                repoId: repoId,
                avatarUrl: data.owner.avatar_url,
                creationDate: data.created_at,
            };

            const repoPlus: IRepos[] = [...repos, newRepo];
            setRepos(repoPlus);
            await AsyncStorage.setItem("@Repos:repos", JSON.stringify(repoPlus));
        } catch (e) {
            Alert.alert("Não encontrado!")
            window.alert("Não encontrado!")
        } finally {
            setModalConfirmVisible(false);
        }
    }

    const deleteAll = async () => {
        try {
            await AsyncStorage.removeItem("@Repos:repos");
            setRepos([]);
            closeModal();
        } catch (e) {

        }
    }

    const closeModal = () => {
        setModalConfirmVisible(false);
        setModalDeleteVisible(false);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.header}>
                <TouchableOpacity onPress={() => setModalConfirmVisible(true)}>
                    <Text style={styles.addButton}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalDeleteVisible(true)}>
                    <Text style={styles.delButton}>-</Text>
                </TouchableOpacity>
            </ThemedView>

            {repos.map((repo) => (
                <RepositoryItem
                    key={repo.id}
                    owner={repo.ownerId}
                    repo={repo.repoId}
                    date={repo.creationDate}
                    avatarUrl={repo.ownerUrl}
                />
            ))}

            <ReposModal
                visible={modalConfirmVisible}
                onCancel={closeModal}
                onAdd={onAdd}
            />

            <ConfirmDeleteModal
                visible={modalDeleteVisible}
                onCancel={closeModal}
                onDelete={deleteAll}
            />
        </ParallaxScrollView>

    );
}

//copiei o design do chatgpt, ent tem coisas desnecessárias para remover, 27/05/2025.

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        height: 20,
        width: '100%',
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        fontSize: 40,
        margin: 10,
        padding: 5,
        width: 100,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 24,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        shadowColor: '#000',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 6,
        flex: 1,
        marginRight: 8,
    },
    modalButtonCancel: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        flex: 1,
        marginLeft: 8,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    delButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        fontSize: 40,
        margin: 10,
        padding: 5,
        width: 100,
    },
});