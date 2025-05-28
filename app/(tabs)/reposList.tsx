import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IRepos } from '@/interfaces/IRepos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReposModal from '@/components/modal/ReposModal';
import axios from 'axios';

export default function ReposListScreen() {
    const [repos, setRepos] = useState<IRepos[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

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
                ownerUrl: data.owner.avatar_url,
                creationDate: data.created_at,
            };

            const repoPlus: IRepos[] = [...repos, newRepo];
            setRepos(repoPlus);
            await AsyncStorage.setItem("@Repos:repos", JSON.stringify(repoPlus));
        } catch (e) {

        } finally {
            setModalVisible(false);
        }
    }
    const closeModal = () => {
        setModalVisible(false);
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
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <ThemedText style={styles.addButton}>+</ThemedText>
                </TouchableOpacity>
            </ThemedView>
            
            <ThemedView style={{ paddingHorizontal: 16 }}>
                {repos.map((repo) => (
                    <View key={repo.id} style={{ marginBottom: 16 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{repo.ownerId}/{repo.repoId}</Text>
                        <Text>🌐 URL: {repo.ownerUrl}</Text>
                        <Text>📅 Criado em: {new Date(repo.creationDate).toLocaleDateString()}</Text>
                    </View>
                ))}
            </ThemedView>

            <ReposModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
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
    },
    addButton: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007AFF',
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
});