export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			'bot-settings': {
				Row: {
					allow_schedules: boolean
					created_at: string
					guild_id: string
				}
				Insert: {
					allow_schedules?: boolean
					created_at?: string
					guild_id: string
				}
				Update: {
					allow_schedules?: boolean
					created_at?: string
					guild_id?: string
				}
				Relationships: []
			}
			'free-players': {
				Row: {
					created_at: string
					discord_id: string
					discord_name: string
					message_id: string
					osu_id: string
					rank: number | null
					timezone: string
					updated_at: string
				}
				Insert: {
					created_at?: string
					discord_id: string
					discord_name: string
					message_id: string
					osu_id: string
					rank?: number | null
					timezone: string
					updated_at: string
				}
				Update: {
					created_at?: string
					discord_id?: string
					discord_name?: string
					message_id?: string
					osu_id?: string
					rank?: number | null
					timezone?: string
					updated_at?: string
				}
				Relationships: []
			}
			invites: {
				Row: {
					created_at: string
					id: number
					status: Database['public']['Enums']['invite_status']
					team_id: number
					updated_at: string
					user_id: string
				}
				Insert: {
					created_at?: string
					id?: number
					status?: Database['public']['Enums']['invite_status']
					team_id: number
					updated_at: string
					user_id: string
				}
				Update: {
					created_at?: string
					id?: number
					status?: Database['public']['Enums']['invite_status']
					team_id?: number
					updated_at?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'invites_team_id_fkey'
						columns: ['team_id']
						isOneToOne: false
						referencedRelation: 'teams'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'invites_user_id_fkey'
						columns: ['user_id']
						isOneToOne: false
						referencedRelation: 'users'
						referencedColumns: ['osu_id']
					}
				]
			}
			lobbies: {
				Row: {
					created_at: string
					date: string
					id: number
					lobby_id: string | null
					referee: string
					time: string
				}
				Insert: {
					created_at?: string
					date: string
					id?: number
					lobby_id?: string | null
					referee: string
					time: string
				}
				Update: {
					created_at?: string
					date?: string
					id?: number
					lobby_id?: string | null
					referee?: string
					time?: string
				}
				Relationships: []
			}
			'looking-for-team-panel': {
				Row: {
					created_at: string
					guild_id: string
					message_id: string
					updated_at: string
				}
				Insert: {
					created_at?: string
					guild_id: string
					message_id: string
					updated_at?: string
				}
				Update: {
					created_at?: string
					guild_id?: string
					message_id?: string
					updated_at?: string
				}
				Relationships: []
			}
			mappools: {
				Row: {
					created_at: string
					id: number
					mappack: string | null
					released: boolean
					round: string
				}
				Insert: {
					created_at?: string
					id?: number
					mappack?: string | null
					released?: boolean
					round: string
				}
				Update: {
					created_at?: string
					id?: number
					mappack?: string | null
					released?: boolean
					round?: string
				}
				Relationships: []
			}
			maps: {
				Row: {
					ar: number
					artist: string
					beatmap_id: number
					beatmapset_id: number
					bpm: number
					created_at: string
					cs: number
					difficulty: string
					dt_rate: number | null
					id: number
					length: string
					mapper: string
					mappool_id: number
					mod: Database['public']['Enums']['mod']
					mod_settings: Json[] | null
					name: string
					od: number
					slot: string
					sr: number
					sub_mod: Database['public']['Enums']['sub_mod'] | null
				}
				Insert: {
					ar: number
					artist: string
					beatmap_id: number
					beatmapset_id: number
					bpm: number
					created_at?: string
					cs: number
					difficulty: string
					dt_rate?: number | null
					id?: number
					length: string
					mapper: string
					mappool_id: number
					mod: Database['public']['Enums']['mod']
					mod_settings?: Json[] | null
					name: string
					od: number
					slot: string
					sr: number
					sub_mod?: Database['public']['Enums']['sub_mod'] | null
				}
				Update: {
					ar?: number
					artist?: string
					beatmap_id?: number
					beatmapset_id?: number
					bpm?: number
					created_at?: string
					cs?: number
					difficulty?: string
					dt_rate?: number | null
					id?: number
					length?: string
					mapper?: string
					mappool_id?: number
					mod?: Database['public']['Enums']['mod']
					mod_settings?: Json[] | null
					name?: string
					od?: number
					slot?: string
					sr?: number
					sub_mod?: Database['public']['Enums']['sub_mod'] | null
				}
				Relationships: [
					{
						foreignKeyName: 'public_maps_mappoolid_fkey'
						columns: ['mappool_id']
						isOneToOne: false
						referencedRelation: 'mappools'
						referencedColumns: ['id']
					}
				]
			}
			matches: {
				Row: {
					created_at: string
					date: string
					id: number
					match_id: number
					referee: string
					round: string
					team1_id: number
					team1_score: number
					team2_id: number
					team2_score: number
					time: string
					type: Database['public']['Enums']['match_type']
				}
				Insert: {
					created_at?: string
					date: string
					id?: number
					match_id: number
					referee: string
					round: string
					team1_id: number
					team1_score: number
					team2_id: number
					team2_score: number
					time: string
					type: Database['public']['Enums']['match_type']
				}
				Update: {
					created_at?: string
					date?: string
					id?: number
					match_id?: number
					referee?: string
					round?: string
					team1_id?: number
					team1_score?: number
					team2_id?: number
					team2_score?: number
					time?: string
					type?: Database['public']['Enums']['match_type']
				}
				Relationships: [
					{
						foreignKeyName: 'public_matches_team1_id_fkey'
						columns: ['team1_id']
						isOneToOne: false
						referencedRelation: 'teams'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_matches_team2_id_fkey'
						columns: ['team2_id']
						isOneToOne: false
						referencedRelation: 'teams'
						referencedColumns: ['id']
					}
				]
			}
			players: {
				Row: {
					created_at: string
					joined_at: string
					role: Database['public']['Enums']['player_role']
					team_id: number
					updated_at: string
					user_id: string
				}
				Insert: {
					created_at?: string
					joined_at: string
					role: Database['public']['Enums']['player_role']
					team_id: number
					updated_at: string
					user_id: string
				}
				Update: {
					created_at?: string
					joined_at?: string
					role?: Database['public']['Enums']['player_role']
					team_id?: number
					updated_at?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'players_team_id_fkey'
						columns: ['team_id']
						isOneToOne: false
						referencedRelation: 'teams'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'players_user_id_fkey'
						columns: ['user_id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['osu_id']
					}
				]
			}
			teams: {
				Row: {
					acronym: string
					created_at: string
					flag: string
					id: number
					name: string
					qual_lobby_id: number | null
					timezone: string
					updated_at: string
				}
				Insert: {
					acronym: string
					created_at?: string
					flag: string
					id?: number
					name: string
					qual_lobby_id?: number | null
					timezone: string
					updated_at: string
				}
				Update: {
					acronym?: string
					created_at?: string
					flag?: string
					id?: number
					name?: string
					qual_lobby_id?: number | null
					timezone?: string
					updated_at?: string
				}
				Relationships: [
					{
						foreignKeyName: 'public_teams_qual_lobby_id_fkey'
						columns: ['qual_lobby_id']
						isOneToOne: false
						referencedRelation: 'lobbies'
						referencedColumns: ['id']
					}
				]
			}
			tokens: {
				Row: {
					created_at: string
					discord_access_token: string
					discord_refresh_token: string
					old: boolean
					osu_access_token: string
					osu_id: string
					osu_refresh_token: string
				}
				Insert: {
					created_at?: string
					discord_access_token: string
					discord_refresh_token: string
					old?: boolean
					osu_access_token: string
					osu_id: string
					osu_refresh_token: string
				}
				Update: {
					created_at?: string
					discord_access_token?: string
					discord_refresh_token?: string
					old?: boolean
					osu_access_token?: string
					osu_id?: string
					osu_refresh_token?: string
				}
				Relationships: [
					{
						foreignKeyName: 'tokens_osu_id_fkey'
						columns: ['osu_id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['osu_id']
					}
				]
			}
			users: {
				Row: {
					country: string
					country_code: string
					country_rank: number | null
					created_at: string
					discord_avatar: string | null
					discord_id: string
					discord_name: string | null
					discord_tag: string
					osu_avatar: string
					osu_id: string
					osu_name: string
					rank: number | null
					restricted: boolean
				}
				Insert: {
					country: string
					country_code: string
					country_rank?: number | null
					created_at?: string
					discord_avatar?: string | null
					discord_id: string
					discord_name?: string | null
					discord_tag: string
					osu_avatar: string
					osu_id: string
					osu_name: string
					rank?: number | null
					restricted: boolean
				}
				Update: {
					country?: string
					country_code?: string
					country_rank?: number | null
					created_at?: string
					discord_avatar?: string | null
					discord_id?: string
					discord_name?: string | null
					discord_tag?: string
					osu_avatar?: string
					osu_id?: string
					osu_name?: string
					rank?: number | null
					restricted?: boolean
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			citext:
				| {
						Args: {
							'': boolean
						}
						Returns: string
				  }
				| {
						Args: {
							'': string
						}
						Returns: string
				  }
				| {
						Args: {
							'': unknown
						}
						Returns: string
				  }
			citext_hash: {
				Args: {
					'': string
				}
				Returns: number
			}
			citextin: {
				Args: {
					'': unknown
				}
				Returns: string
			}
			citextout: {
				Args: {
					'': string
				}
				Returns: unknown
			}
			citextrecv: {
				Args: {
					'': unknown
				}
				Returns: string
			}
			citextsend: {
				Args: {
					'': string
				}
				Returns: string
			}
			request_user_id: {
				Args: Record<PropertyKey, never>
				Returns: string
			}
		}
		Enums: {
			invite_status: 'pending' | 'accepted' | 'denied'
			match_type: 'loser' | 'loser2' | 'winner'
			mod: 'NM' | 'HD' | 'HR' | 'DT' | 'LM' | 'TB'
			player_role: 'captain' | 'player'
			sub_mod:
				| 'BR'
				| 'TC'
				| 'DF'
				| 'GR'
				| 'SI'
				| 'WG'
				| 'TR'
				| 'WU'
				| 'WD'
				| 'AD'
				| 'NS'
				| 'MG'
				| 'RP'
				| 'AS'
				| 'FR'
				| 'BU'
				| 'SY'
				| 'DP'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
				PublicSchema['Views'])
	  ? (PublicSchema['Tables'] &
				PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R
		  }
			? R
			: never
	  : never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I
		  }
			? I
			: never
	  : never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U
		  }
			? U
			: never
	  : never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
	  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
	  : never
