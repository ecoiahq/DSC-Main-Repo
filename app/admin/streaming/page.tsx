"use client"

import { useState } from "react"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Copy, Settings, Info, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StreamingAdminPage() {
  const [streamTitle, setStreamTitle] = useState("Paralympic Qualifiers: USA vs Canada")
  const [streamDescription, setStreamDescription] = useState(
    "Watch the thrilling semifinal match between USA and Canada in the Wheelchair Basketball Championship.",
  )
  const [streamCategory, setStreamCategory] = useState("wheelchair-basketball")
  const [isLive, setIsLive] = useState(false)
  const [streamyardId, setStreamyardId] = useState("")
  const [copied, setCopied] = useState(false)

  const rtmpUrl = "rtmp://live.example.com/app"
  const streamKey = "sk_123456789_abcdefghijklmnopqrstuvwxyz"

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Streaming Admin</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your live streams and StreamYard integration</p>
          </div>

          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create Stream</TabsTrigger>
              <TabsTrigger value="settings">Stream Settings</TabsTrigger>
              <TabsTrigger value="streamyard">StreamYard Setup</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Live Stream</CardTitle>
                  <CardDescription>Set up the details for your next live broadcast</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Stream Title</Label>
                    <Input
                      id="title"
                      value={streamTitle}
                      onChange={(e) => setStreamTitle(e.target.value)}
                      placeholder="Enter stream title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Stream Description</Label>
                    <Textarea
                      id="description"
                      value={streamDescription}
                      onChange={(e) => setStreamDescription(e.target.value)}
                      placeholder="Enter stream description"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={streamCategory} onValueChange={setStreamCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheelchair-basketball">Wheelchair Basketball</SelectItem>
                        <SelectItem value="para-athletics">Para Athletics</SelectItem>
                        <SelectItem value="para-swimming">Para Swimming</SelectItem>
                        <SelectItem value="wheelchair-rugby">Wheelchair Rugby</SelectItem>
                        <SelectItem value="sitting-volleyball">Sitting Volleyball</SelectItem>
                        <SelectItem value="para-cycling">Para Cycling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="streamyard-id">StreamYard Broadcast ID</Label>
                    <Input
                      id="streamyard-id"
                      value={streamyardId}
                      onChange={(e) => setStreamyardId(e.target.value)}
                      placeholder="e.g., abcd1234"
                    />
                    <p className="text-xs text-gray-500">This is the ID from your StreamYard broadcast URL</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="live" checked={isLive} onCheckedChange={setIsLive} />
                    <Label htmlFor="live">Stream is live</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Stream</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Stream Settings</CardTitle>
                  <CardDescription>Configure your streaming settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>RTMP URL</Label>
                    <div className="flex">
                      <Input value={rtmpUrl} readOnly className="rounded-r-none" />
                      <Button variant="outline" className="rounded-l-none" onClick={() => handleCopy(rtmpUrl)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Stream Key</Label>
                    <div className="flex">
                      <Input type="password" value={streamKey} readOnly className="rounded-r-none" />
                      <Button variant="outline" className="rounded-l-none" onClick={() => handleCopy(streamKey)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Keep your stream key private. Never share it publicly.</p>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>AWS Integration</AlertTitle>
                    <AlertDescription>
                      These credentials connect to AWS MediaLive. Contact your administrator if you need to reset them.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label>Stream Quality</Label>
                    <Select defaultValue="720p">
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">1080p (High)</SelectItem>
                        <SelectItem value="720p">720p (Medium)</SelectItem>
                        <SelectItem value="480p">480p (Low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="streamyard">
              <Card>
                <CardHeader>
                  <CardTitle>StreamYard Integration</CardTitle>
                  <CardDescription>Connect your StreamYard account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          StreamYard Integration Options
                        </h3>
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          <p>There are two ways to integrate StreamYard with your website:</p>
                          <ul className="mt-1 list-disc pl-5 space-y-1">
                            <li>Direct embed using StreamYard's public destination</li>
                            <li>RTMP output to AWS MediaLive for advanced features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Option 1: Direct Embed</h3>
                    <ol className="space-y-4">
                      <li className="flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 mr-2">
                          1
                        </span>
                        <div>
                          <p>In StreamYard, create a broadcast and add a "Public" destination</p>
                        </div>
                      </li>
                      <li className="flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 mr-2">
                          2
                        </span>
                        <div>
                          <p>Copy the embed code or broadcast ID from StreamYard</p>
                        </div>
                      </li>
                      <li className="flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 mr-2">
                          3
                        </span>
                        <div>
                          <p>Paste the ID in the "Create Stream" form</p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Option 2: AWS MediaLive Integration</h3>
                    <ol className="space-y-4">
                      <li className="flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 mr-2">
                          1
                        </span>
                        <div>
                          <p>In StreamYard, create a broadcast and add a "Custom RTMP" destination</p>
                        </div>
                      </li>
                      <li className="flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 mr-2">
                          2
                        </span>
                        <div>
                          <p>Enter the RTMP URL and Stream Key from the "Stream Settings" tab</p>
                        </div>
                      </li>
                      <li className="flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 mr-2">
                          3
                        </span>
                        <div>
                          <p>AWS MediaLive will process your stream and make it available on your website</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Advanced Settings
                  </Button>
                  <Button>Test Connection</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  )
}
